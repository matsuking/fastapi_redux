import jwt
from fastapi import HTTPException
from passlib.context import CryptContext
from datetime import datetime , timedelta
from decouple import config

JWT_KEY = config('JWT_KEY')


class AuthJwtCsrf :
    pwd_ctx = CryptContext(schemes=["bcrypt"] , deprecated="auto")
    select_key = JWT_KEY

    def generate_hashed_pw(self , password) -> str :
        return self.pwd_ctx.hash(password)

    # ユーザーが入力したpwとデータベースに登録しているハッシュ化されたpwを比較
    def verify_pw(self , plain_pw , hashed_pw) -> bool :
        return self.pwd_ctx.verify(plain_pw , hashed_pw)

    def encode_jwt(self , email) -> str :
        payload = {
            "exp" : datetime.utcnow() + timedelta(days=0 , minutes=5) ,
            "iat" : datetime.utcnow() ,
            "sub" : email
        }
        return jwt.encode(
            payload ,
            self.select_key ,
            algorithm="HS256"
        )

    def decode_jwt(self , token) -> str :
        try :
            payload = jwt.decode(token , self.select_key , algorithms=["HS256"])
            return payload["sub"]
        except jwt.ExpiredSignatureError :
            raise HTTPException(
                status_code=401 , detail="The JWT has expired"
            )
        except jwt.InvalidTokenError as e :
            raise HTTPException(status_code=401 , detail="The JWT is not valid")

    # jwtが有効かどうかを判定
    def verify_jwt(self , request) -> str :
        token = request.cookies.get("access_token")
        if not token :
            raise HTTPException(
                status_code=401 , detail="No JWT exist: may not set yet or deleted"
            )

        print("token: " + token)
        _ , _ , value = token.partition(" ")
        subject = self.decode_jwt(value)

        return subject

    def verify_update_jwt(self , request) -> tuple[str , str] :
        # subjectにはe-mailが入ってくる
        subject = self.verify_jwt(request)
        new_token = self.encode_jwt(subject)

        return new_token , subject

    def verify_csrf_update_jwt(self , request , csrf_protect , headers) -> str :
        # headerからCSRF Tokenを取得
        csrf_token = csrf_protect.get_csrf_from_headers(headers)
        # validate_csrfでCSRF Tokenが有効かどうかを検証（例外処理も入っている）
        csrf_protect.validate_csrf(csrf_token)

        # JWTが有効かどうかを検証
        subject = self.verify_jwt(request)
        new_token = self.encode_jwt(subject)

        return new_token

from flask_restx import Api

api = Api()


def create_error(message, status_code):
    return {'error': {'message': message}}, status_code

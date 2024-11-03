from flask_restx import Resource, Namespace
from calculator import Calculator
import models

ns = Namespace("api")


@ns.route("/calculate")
class Calculate(Resource):
    def __init__(self):
        self.calculator = Calculator()

    @ns.expect()
    def get(self):
        return {"hello": "restx"}

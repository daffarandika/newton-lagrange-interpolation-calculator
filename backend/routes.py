from api import create_error
from calculator import Calculator, Point
from flask import send_from_directory
from flask_restx import Resource, Namespace
from models import calculation_request, calculation_response
import os

ns = Namespace("api")
calculator = Calculator()
HTML_FOLDER = os.path.join(os.getcwd(), 'static/html')


@ns.route("/calculate")
class Calculate(Resource):

    @ns.expect(calculation_request)
    def post(self):
        # print(ns.payload)
        method, points, x = ns.payload["method"], ns.payload["points"], ns.payload["x"]
        f_points = [Point(x=point['x'], y=point['y']) for point in points]

        print(f_points)

        if method not in ["lagrange", "newton"]:
            return create_error("invalid method", 422)

        if method == "newton":
            return calculator.newton_interpolation(f_points, x)

        return {"hello": "restx"}


@ns.route("/html/<path:filename>")
class HtmlServer(Resource):
    def get(self, filename):
        return send_from_directory(HTML_FOLDER, filename)

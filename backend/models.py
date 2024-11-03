from flask_restx import fields
from api import api


point = api.model("point", {
    "x": fields.Float,
    "y": fields.Float
})

calculation_request = api.model("calculation_request", {
    "method": fields.String,
    "points": fields.List(fields.Nested(point)),
    "x": fields.Float
})

calculation_response = api.model("calculation_response", {
    "status": fields.Integer,
    "rawHtml": fields.String
})

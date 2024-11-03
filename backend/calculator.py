import numpy as np
import plotly.express as px
import pandas as pd
import tempfile
from numpy.polynomial import Polynomial


class Point:
    def __init__(self, x, y):
        self._x = x
        self._y = y

    @property
    def x(self):
        return float(self._x)

    @property
    def y(self):
        return float(self._y)


class Calculator:

    # def newton_interpolation(points: list[Point], x: float) -> dict[float, str]:
    def newton_interpolation(self, points, x):
        '''
        Menggunakan metode newton untuk menyelesaikan masalah interpolasi
        Args:
            points (list[Point]): titik-titik yang diketahui
            x (int): nilai x dari titik yang dicari

        Returs:
            dict[float, str]: bagian float adalah hasil dari interpolasi, bagian string adalah graf dari fungsi dalam format html raw string
        '''
        X = np.array([point.x for point in points])
        Y = np.array([point.y for point in points])
        n = len(points)
        a = np.zeros([n, n])
        a[:, 0] = Y
        for j in range(1, n):
            for i in range(n - j):
                a[i][j] = (a[i + 1][j - 1] - a[i][j - 1]) / (points[i + j].x - points[i].x)

        coefficients = a[0, :]

        def calculate_polynomial(x_val):
            result = coefficients[0]
            product_term = 1.0
            for i in range(1, n):
                product_term *= (x_val - points[i - 1].x)
                result += coefficients[i] * product_term
            return result

        interpolated_value = calculate_polynomial(x)

        x_min = min(point.x for point in points)
        x_max = max(point.x for point in points)
        x_values = np.linspace(x_min, x_max, 100)
        y_values = [calculate_polynomial(x_val) for x_val in x_values]

        df = pd.DataFrame({'x': X, 'y': Y})

        fig = px.scatter(df, x='x', y='y', opacity=0.65)
        fig.add_trace(px.line(x=x_values, y=y_values).data[0])
        fig.add_scatter(x=[x],
                        y=[interpolated_value],
                        marker=dict(
                        color='red',
                        size=10,
                        ),
                        name='interpolasi')

        temp_name = f"static/html/{next(tempfile._get_candidate_names())}.html"
        fig.write_html(temp_name)

        return {"y": interpolated_value, "plot_url": temp_name}

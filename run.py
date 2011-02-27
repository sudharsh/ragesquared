import flask
import config

from flask import Flask, g, render_template

app = Flask("RageSquared")

@app.route('/')
def root():
    return render_template("game.html")

if __name__ == '__main__':
    app.run(host=config.HOST, port=config.PORT, debug=config.DEBUG)
        

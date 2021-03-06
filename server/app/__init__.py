import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate

from .auth import login_manager
from .models import db, User, Instrument, Style
from .api.user_routes import user_routes
from .api.session import session_routes
from .api.recordings import recording_routes
from .api.bands import band_routes
from .api.invitations import invitation_routes

from .config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(session_routes, url_prefix='/api/session')
app.register_blueprint(recording_routes, url_prefix='/api/recordings')
app.register_blueprint(band_routes, url_prefix='/api/bands')
app.register_blueprint(invitation_routes, url_prefix='/api/invitations')
db.init_app(app)
Migrate(app, db)
login_manager.init_app(app)

## Application Security
CORS(app)
CSRFProtect(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        print("favicon route_____")
        return app.send_static_file('favicon.ico')
    print("index route_____")
    return app.send_static_file('index.html')

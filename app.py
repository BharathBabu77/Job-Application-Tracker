from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/job_tracker'
db = SQLAlchemy(app)

class JobApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False)

@app.route('/applications', methods=['GET'])
def get_applications():
    applications = JobApplication.query.all()
    return jsonify([{'id': app.id, 'company': app.company, 'position': app.position, 'status': app.status} for app in applications])

@app.route('/applications', methods=['POST'])
def add_application():
    data = request.json
    new_application = JobApplication(company=data['company'], position=data['position'], status=data['status'])
    db.session.add(new_application)
    db.session.commit()
    return jsonify({'id': new_application.id, 'company': new_application.company, 'position': new_application.position, 'status': new_application.status})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

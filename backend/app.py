from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
db = SQLAlchemy(app)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    done = db.Column(db.Boolean, default=False)
    craete_date = db.Column(db.DateTime, default=datetime.utcnow)

@app.before_request
def create_tables():
    db.create_all()

#get all tasks
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.order_by(Task.craete_date.desc()).all()
    return jsonify([
        {'id': t.id, 'content': t.content, 'done': t.done} for t in tasks
    ])


#Add new task
@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = Task(content=data['content'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message':'Task add successfully'})


#Delete task
@app.route('/api/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task_to_delete = Task.query.get_or_404(id)
    db.session.delete(task_to_delete)
    db.session.commit()
    return jsonify({'message':'Task deleted'})

#Update task
@app.route('/api/tasks/<int:id>',methods=['PUT'])
def updadte_task(id):
    data = request.json
    task_to_update = Task.query.get_or_404(id)
    task_to_update.content = data.get('content',task_to_update.content)
    task_to_update.done = data.get('done', task_to_update.done)
    db.session.commit()
    return jsonify({'message':'Task update'})


if __name__ == '__main__':
    app.run(debug=True)
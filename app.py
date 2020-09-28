from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return 'About'

@app.route('/media')
def media():
    return 'Media'

@app.route('/projects')
def  projects():
    return 'Projects'


# @app.route('/signature', methods ['GET', 'POST'])
# def signature():
#     if request.methof == 'POST':
#         return process_image()
#     else:
#         return show_image_signature_form()



#testing routes
with app.test_request_context():
    print(url_for('index'))
    print(url_for('about'))
    print(url_for('media'))
    print(url_for('projects'))
    

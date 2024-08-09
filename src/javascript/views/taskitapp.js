import React from "react";
import { Row, Col } from 'react-bootstrap';
import SVGIcon from "../components/icon";
import useScreenWidth from "../hooks/useScreenWidth.jsx";
import FancyButton from "../components/button.jsx";
import Landing from '../../img/taskitapp/taskitapp-landing.png';
import HomeWireframe from '../../img/taskitapp/home_wireframe.png';
import HomeFigma from '../../img/taskitapp/home_figma.png';
import HomeFinal from '../../img/taskitapp/home_final.png';
import DB from '../../img/taskitapp/db-diagram.png'
import ImageZoom from "../components/image-zoom.jsx";
import CodeHighlighter from "../components/code-highlighter.jsx";
import Chat from "../../img/taskitapp/chat.gif"
import VideoEmbed from "../components/video-embed.jsx";
import SS from "../../img/taskitapp/taskitapp_ss.png";

const codeSnippets = {
    crud:
    `
@api.route('/requesters', methods=['POST'])
def add_requester():
    data = request.json
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({ 'error': 'Missing user id.'}), 400
    
    existing_user = User.query.get(user_id)
    if not existing_user: return jsonify({ 'error': 'User not found.'}), 404

    if existing_user.role == RoleEnum.REQUESTER or existing_user.role == RoleEnum.BOTH:
        return jsonify({'error': 'User already has requester role.'}), 400

    new_requester = Requester(user=existing_user)
    if existing_user.role == RoleEnum.NONE: existing_user.role = RoleEnum.REQUESTER
    else: existing_user.role = RoleEnum.BOTH

    db.session.add(new_requester)
    db.session.commit()

    return jsonify({'message': 'Requester role successfully added to user.'}), 201
    `,
    socketioBackend:
    `
@socketio.on('connect')
def handle_connect():
    username = request.args.get('username')
    if username:
        usernames[request.sid] = username
        emit('online_users', {'users': list(usernames.values())}, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    remove_user_from_typing()
    if request.sid in usernames:
        del usernames[request.sid]
        emit('online_users', {'users': list(usernames.values())}, broadcast=True)

@socketio.on('message')
def handle_message(data):
    msg = data.get('message', 'No message provided')
    user = data.get('username')
    room = data.get('room')
    unique_id = data.get('client_generated_id')
    send({'client_generated_id': unique_id, 'room_name': room, 'message': msg, 'username': user}, room=room)
    emit('unseen_message', {'room': room}, room=room)

@socketio.on('join')
def handle_join(data):
    room = data['room']
    join_room(room)
    `,
    socketioFrontend:
    `
useEffect(() => {
    setLoading(true);
    fetchMessages();

    if (!socket) return;

    socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        scrollToBottom();
    });
        
    socket.on('typing_status', ({ room, users }) => {
        setTypingUsers((prevTypingUsers) => ({
            ...prevTypingUsers,
            [room]: users,
        }));
    });

    return () => {
        socket.off('message');
        socket.off('typing_status');            
        handleStopTyping();
        actions.setUnseenMessages({ room: store.currentChat.room_name, hasUnseenMessages: false }, true);
        actions.setCurrentChat(null);
    };
}, [store.currentChat, socket]);

const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
        const uniqueId = actions.generateUniqueId();
        socket.emit('message', { client_generated_id: uniqueId, username: store.user?.username, message, room: store.currentChat?.room_name }); 
        const config = {
            method: "POST",
            body: JSON.stringify({ client_generated_id: uniqueId, message, sender_id: store.user.id }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        fetch(process.env.BACKEND_URL + "/api/chats/#{store.currentChat?.id}/messages", config)
        .catch(error => console.error(error));

        handleStopTyping();
        setMessage('');
    }
};`
}

function TaskItApp() {
    const smallDevice = useScreenWidth();

    return (
        <div className={`card ${smallDevice ? 'my-5 p-2' : 'm-5'}`}>
            <Row className="my-4 light-blue-text">
                <Col>
                    <h1 className="text-center">Task It App</h1>
                    <div className={`d-flex justify-content-between`}>
                        <div>
                            <SVGIcon iconName={'react'} />
                            <SVGIcon iconName={'flask'} classes={'ps-3'} />
                            <SVGIcon iconName={'postgresql'} classes={'ps-3'} />
                        </div>
                        <div>
                            <FancyButton text={smallDevice ? '' : 'Repository'} icon={'mingcute:github-line'} handleClick={() => window.open('https://github.com/BlondyMartinez/TaskItApp', '_blank')} />
                        </div>
                    </div>
                    <p className="text-white"><strong className="orange-text">Note:</strong> This project is not deployed due to backend deployment costs.</p>
                </Col>
            </Row>
        
            <Row className="my-4 text-white">
                <Col xs={12} lg={7}>
                    <h3 className="orange-text">Overview</h3>
                    <p>Platform that connects Requesters (people who post tasks) with Seekers (people who complete tasks) - or even both!</p>
                    <p>
                        <strong className="light-blue-text">Note:</strong> This was a collaborative project where I served as the team leader. I was responsible for the majority of the frontend and backend development, as well as the design aspects of the application.
                    </p>

                    <h3 className="pt-5 orange-text">Features</h3>
                    <ul>
                        <li>Real-time notifications</li>
                        <li>Fully functional real-time chat</li>
                        <li>Cloudinary for media management</li>
                        <li>Google Maps API for location services</li>
                    </ul>

                    <h3 className="pt-5 orange-text">Design Process</h3>
                    <p>
                        The design process began with creating several wireframes to outline the structure and flow of the application. Which I  later translated into designs using Figma, ensuring a consistent and polished look and feel across the platform.
                    </p>
                    <div className={`d-flex gap-3 ${smallDevice ? 'flex-column' : ''}`}>
                        <ImageZoom src={HomeWireframe} label={'Wireframe'} />
                        <ImageZoom src={HomeFigma} label={'Design'} />
                        <ImageZoom src={HomeFinal} label={'Final Product'} />
                    </div>

                    <h3 className="pt-5 orange-text">Database</h3>
                    <div className="d-flex justify-content-between">
                        <Col xs={12} lg={6}>
                            <p>
                                Developed a robust database schema encompassing core functionalities. Created models for Users, Task Seekers, and Requesters to manage user profiles and roles. 
                                Implemented a Task model for detailed task management, including status, deadlines, and location. Designed a Notification system to keep users updated. 
                                Built Chat and ChatMessage models to facilitate real-time communication between users, enhancing user engagement and collaboration within the platform.
                            </p>
                            <p className="light-blue-text"> My contributions are in pink.</p>
                        </Col>
                        
                        <Col>
                            <ImageZoom src={DB} label={'Database Diagram'}></ImageZoom>
                        </Col>
                    </div>
                </Col>
                {!smallDevice && 
                    <Col>
                        <img src={Landing} className="img-fluid radius-20"></img>
                    </Col>
                }

                <Row>
                    <Col xs={12} lg={6}>
                        <h3 className="pt-5 orange-text">API Development</h3>
                        <p>
                            Implemented comprehensive CRUD operations for core entities. 
                            Developed backend endpoints to create, read, update, and delete User, Task Seeker, Requester, Notification, Task, Chat, and ChatMessage data, ensuring seamless data management and interaction within the application.
                        </p>
                        <CodeHighlighter code={codeSnippets.crud} language={'py'} />

                        <div className="d-flex justify-content-center">
                            <img className="img-fluid radius-20" src={Chat} style={{ maxHeight: '45rem' }}></img>
                        </div>
                    </Col>

                    <Col>
                        <h3 className="pt-5 orange-text">Real-Time Communication with Socket.IO</h3>
                        <p>Leveraged Socket.IO to implement robust real-time features, enhancing user experience and engagement. Key functionalities include:</p>
                        <ul>
                            <li><strong>Instant Messaging:</strong> Facilitated real-time, bi-directional communication between users within dedicated chat rooms.</li>
                            <li><strong>User Presence:</strong> Maintained accurate user presence information, broadcasting online/offline status and typing indicators.</li>
                            <li><strong>Notifications:</strong> Enabled efficient delivery of real-time notifications to specific users or groups, improving information dissemination.</li>
                            <li><strong>Chat Management:</strong> Implemented seamless chat room creation, joining, and leaving, ensuring smooth user interactions.</li>
                        </ul>
                        <CodeHighlighter code={codeSnippets.socketioBackend} language={'py'} />
                        <CodeHighlighter code={codeSnippets.socketioFrontend} language={'js'} />
                    </Col>
                </Row>

                <Row className="d-flex justify-content-center">
                    <Col xs={12} lg={8}>
                        <img className="img-fluid" src={SS}></img>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} lg={6}>
                        <h3 className="pt-5 orange-text">Full Preview</h3>
                        <VideoEmbed src={"https://www.youtube.com/embed/41IcTPGC3bw?si=UWZFR7TwdRIzY-7k"}></VideoEmbed>
                    </Col>
                    
                    <Col>
                        <h3 className="pt-5 orange-text">Presentation (in Spanish)</h3>
                        <VideoEmbed src={"https://www.youtube.com/embed/Hi3I-b5jm7c?si=RxoHbR3oGYZVukZr&amp;start=2764"}></VideoEmbed>
                    </Col>
                </Row>
            </Row>
        </div>
    );
}
  
export default TaskItApp;
  
const centralNode = new RTCPeerConnection(servers);
const clientNode1 = new RTCPeerConnection(servers);
const clientNode2 = new RTCPeerConnection(servers);

try{
	const sendChannel = centralNode.createDataChannel('sendDataChannel');
	trace('Created send data channel');
}
catch(e){
	alert('Failed to create Data Channel');
	trace('createDataChannel failed with exception: ' + e.message);
}
var receiveChannel1, receiveChannel2;
sendChannel.id=0
console.log("Channel id: " + sendChannel.id);

clientNode1.ondatachannel = (event) => {
  receiveChannel1 = event.channel;
  receiveChannel1.onmessage = onReceiveMessage;
  receiveChannel1.onopen = onReceiveChannelStateChange;
  receiveChannel1.onclose = onReceiveChannelStateChange;
};

function onReceiveMessage(event) {
  document.querySelector("textarea#send").value = event.data;
}

function onReceiveChannelStateChange() {
  var readyState = receiveChannel1.readyState;
  trace('Receive channel state is: ' + readyState);
}

document.querySelector("button#send").onclick = () => {
  var data = document.querySelector("textarea#send").value;
  sendChannel.send(data);
};



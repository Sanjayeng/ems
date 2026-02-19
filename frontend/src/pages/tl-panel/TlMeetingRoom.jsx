import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  ScreenShare,
  UserPlus,
  Link,
  Flag,
  Circle,
} from "lucide-react";

const TlMeetingRoom = () => {
  const { id } = useParams();

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [recording, setRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const videoRef = useRef(null);

  // Get camera + mic stream
  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    getMedia();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Start Recording
  const startRecording = () => {
    chunksRef.current = [];

    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `meeting-${id}.webm`;
      a.click();

      URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  // Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">

      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-gray-800">
        <h2 className="font-semibold">Meeting ID: {id}</h2>
        <span className="text-sm text-green-400">Live</span>
      </div>

      {/* Video Area */}
      <div className="flex-1 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="bg-black w-3/4 h-3/4 rounded-xl"
        />
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4 flex justify-center gap-6">

        <button onClick={() => setMicOn(!micOn)}>
          {micOn ? <Mic /> : <MicOff />}
        </button>

        <button onClick={() => setCameraOn(!cameraOn)}>
          {cameraOn ? <Video /> : <VideoOff />}
        </button>

        <button>
          <MessageSquare />
        </button>

        {/* RECORD BUTTON */}
        <button
          onClick={recording ? stopRecording : startRecording}
        >
          <Circle className={recording ? "text-red-500 animate-pulse" : ""} />
        </button>

        <button>
          <UserPlus />
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Meeting link copied!");
          }}
        >
          <Link />
        </button>

        <button>
          <Flag />
        </button>

        <button>
          <ScreenShare />
        </button>

      </div>
    </div>
  );
};

export default TlMeetingRoom;

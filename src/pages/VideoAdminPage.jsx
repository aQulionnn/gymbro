import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { addVideo, deleteVideo, editVideo, getVideos } from "../request";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";

function VideoAdminPage() {
  const [viedos, setViedos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    urlVideo: "",
    desc: "",
    title:""
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedVideo, setEditedVideo] = useState({
    id: null,
    urlVideo: "",
    desc: "",
    title:""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getVideos();
        setViedos(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteVideo = async (id) => {
    try {
      await deleteVideo(id);
      const updatedVideos = viedos.filter((video) => video.id !== id);
      setViedos(updatedVideos);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setNewVideo({
      urlVideo: "",
      desc: "",
      title:""
    });
    setOpenModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setNewVideo({
      ...newVideo,
      [name]: value,
    });
  };

  const handleAcceptVideo = async () => {
    try {
      await addVideo(newVideo);
      
      setOpenModal(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleOpenEditModal = (video) => {
    setEditedVideo(video);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditedVideo({
      id: null,
      urlVideo: "",
      desc: "",
      title:""
    });
    setEditModalOpen(false);
  };

  const handleEditVideo = async () => {
    try {
      await editVideo(editedVideo);
      setEditModalOpen(false);

      setEditModalOpen(false);
    } catch (error) {
      console.error("Error uploading file or editing post:", error);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <Button
        style={{
          backgroundColor: "green",
          color: "white",
          border: "0px",
          borderRadius: "5px",
          width: "100px",
          height: "30px",
          margin: "10px",
        }}
        onClick={handleOpenModal}
      >
        Добавить
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        viedos.map((video, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #808080",
              padding: "10px",
              margin: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease",
              ":hover": {
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography variant="h6">{video.title}</Typography>
            <Typography>{video.urlVideo}</Typography>
            <Typography>{video.desc}</Typography>
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                border: "0px",
                borderRadius: "5px",
                width: "100px",
                height: "30px",
                margin: "10px",
              }}
              onClick={() => handleDeleteVideo(video.id)}
            >
              Удалить
            </Button>

            <Button
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "0px",
                borderRadius: "5px",
                width: "100px",
                height: "30px",
                margin: "10px",
              }}
              onClick={() => handleOpenEditModal(video)}
            >
              Изменить
            </Button>
          </div>
        ))
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" id="modal-title">
            Добавить новое видео
          </Typography>
          <TextField
            id="title"
            name="title"
            label="Загаловка"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newVideo.title}
            onChange={handleInputChange}
          />
          
          <TextField
            id="decs"
            name="desc"
            label="Описание"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newVideo.desc}
            onChange={handleInputChange}
          />

          <TextField
            id="urlVideo"
            name="urlVideo"
            label="Ссылка"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newVideo.urlVideo}
            onChange={handleInputChange}
          />

          <Button
            variant="contained"
            onClick={handleAcceptVideo}
            style={{ marginRight: "10px" }}
          >
            Принять
          </Button>
          <Button variant="contained" color="error" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Box>
      </Modal>

      {/* Модальное окно для редактирования поста */}
      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" id="edit-modal-title">
            Редактировать пост
          </Typography>

          <TextField
            id="edit-title"
            name="title"
            label="Загаловка"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedVideo.title}
            onChange={(event) =>
              setEditedVideo({ ...editedVideo, title: event.target.value })
            }
          />
          <TextField
            id="edit-title"
            name="desc"
            label="Описание"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedVideo.desc}
            onChange={(event) =>
              setEditedVideo({ ...editedVideo, desc: event.target.value })
            }
          />

          <TextField
            id="edit-title"
            name="urlVideo"
            label="Ссылка"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedVideo.urlVideo}
            onChange={(event) =>
              setEditedVideo({ ...editedVideo, urlVideo: event.target.value })
            }
          />

          

          <Button
            variant="contained"
            onClick={handleEditVideo}
            style={{ marginRight: "10px" }}
          >
            Изменить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseEditModal}
          >
            Закрыть
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default VideoAdminPage;

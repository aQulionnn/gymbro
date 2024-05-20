import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Modal,
  Box,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { addFile, addPost, deletePost, editPost, getPosts } from "../request";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import style from '../Style/MainAdminPage.module.css'
import DeleteIcon from '@mui/icons-material/Delete';

function MainAdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    text: "",
    photo: null,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState({
    id: null,
    title: "",
    text: "",
    photo: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getPosts();
        setPosts(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setNewPost({
      title: "",
      text: "",
      photo: null,
    });
    setPhoto(null);
    setOpenModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleAcceptPost = async () => {
    try {
      const selectedPhoto = photo;
      const uploadedPhoto = await addFile(selectedPhoto);

      const newPostWithPhoto = {
        ...newPost,
        photo: uploadedPhoto.fileName,
      };

      await addPost(newPostWithPhoto);

      setOpenModal(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleOpenEditModal = (post) => {
    setEditedPost(post);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditedPost({
      id: null,
      title: "",
      text: "",
      photo: null,
    });
    setEditModalOpen(false);
  };

  const handleEditPost = async () => {
    try {
      const selectedPhoto = editedPost.photo;

      if (typeof selectedPhoto !== "string") {
        const uploadedPhoto = await addFile(selectedPhoto);

        const editedPostWithPhoto = {
          ...editedPost,
          photo: uploadedPhoto.fileName,
        };
        await editPost(editedPostWithPhoto);
        setEditModalOpen(false);
      }
      
      const editedPostWithPhoto = {
        ...editedPost
      };
      await editPost(editedPostWithPhoto);
      setEditModalOpen(false);

    } catch (error) {
      console.error("Error uploading file or editing post:", error);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <button className={style.add} onClick={handleOpenModal}>
        <div className={style.add_icon}></div>
      </button>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={style.main}>
        {posts.map((post, index) => (
          <div  key={index} className={style.container}>
            <div className={style.top_section}>
              <img
                src={"https://localhost:7209/api/File/" + post.photo}
                style={{ width: 200, height: 200}}
              />
              <h3>{post.title}</h3>
              <div className={style.btns}>
                <button className={style.delete} onClick={() => handleDeletePost(post.id)}>
                  {<DeleteIcon />}
                </button>
                <button className={style.edit} onClick={() => handleOpenEditModal(post)}>
                  <div className={style.edit_icon}></div>
                </button>
              </div>
            </div>
            <hr/>
            <p>{post.text}</p>
          </div>
        ))}
        </div>
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
            Добавить новый пост
          </Typography>
          <TextField
            id="title"
            name="title"
            label="Заголовок"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newPost.title}
            onChange={handleInputChange}
          />
          <textarea
            style={{ overflow: "auto", width: "392px", height: "200px" }}
            placeholder="Текст"
            value={newPost.text}
            onChange={(event) =>
              setNewPost({ ...newPost, text: event.target.value })
            }
          ></textarea>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="photo-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="photo-upload">
            <Button
              variant="contained"
              component="span"
              fullWidth
              style={{ marginBottom: "10px" }}
              disabled={photo == null ? false : true}
            >
              Загрузить фото
            </Button>
          </label>
          <Button
            variant="contained"
            onClick={handleAcceptPost}
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
            label="Заголовок"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedPost.title}
            onChange={(event) =>
              setEditedPost({ ...editedPost, title: event.target.value })
            }
          />
          <textarea
            style={{ overflow: "auto", width: "392px", height: "200px" }}
            placeholder="Текст"
            value={editedPost.text}
            onChange={(event) =>
              setEditedPost({ ...editedPost, text: event.target.value })
            }
          ></textarea>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="edit-photo-upload"
            type="file"
            onChange={(event) => {
              const file = event.target.files[0];
              setEditedPost({ ...editedPost, photo: file });
            }}
          />
          <label htmlFor="edit-photo-upload">
            <Button
              variant="contained"
              component="span"
              fullWidth
              style={{ marginBottom: "10px" }}
            >
              Загрузить фото
            </Button>
          </label>
          <Button
            variant="contained"
            onClick={handleEditPost}
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

export default MainAdminPage;

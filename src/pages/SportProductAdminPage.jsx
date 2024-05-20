import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import {
  addFile,
  addSportsNutrition,
  addSportsProducts,
  deleteSportsNutrition,
  deleteSportsProducts,
  editSportsNutrition,
  editSportsProducts,
  getAllSportsProducts,
  getSportsNutrition,
} from "../request";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import style from '../Style/SportProductAdminPage.module.css'

function SportProductAdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    desc: "",
    price: 0,
    isSportsNutrition: false,
    photo: null,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    name: "",
    desc: "",
    price: 0,
    isSportsNutrition: false,
    photo: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getAllSportsProducts();
        setProducts(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteSportsProducts(id);
      const updatedPosts = products.filter((product) => product.id !== id);
      setProducts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setNewProduct({
      name: "",
      desc: "",
      price: 0,
      photo: null,
    });
    setPhoto(null);
    setOpenModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleAcceptProduct = async () => {
    try {
      const selectedPhoto = photo;
      const uploadedPhoto = await addFile(selectedPhoto);

      const newProductWithPhoto = {
        ...newProduct,
        photo: uploadedPhoto.fileName,
      };

      await addSportsProducts(newProductWithPhoto);

      setOpenModal(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleOpenEditModal = (product) => {
    setEditedProduct(product);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditedProduct({
      id: null,
      name: "",
      desc: "",
      price: 0,
      isSportsNutrition: true,
      photo: null,
    });
    setEditModalOpen(false);
  };

  const handleEditProduct = async () => {
    try {
      const selectedPhoto = editedProduct.photo;

      console.log(selectedPhoto);
      
      if (typeof selectedPhoto !== "string") {
        const uploadedPhoto = await addFile(selectedPhoto);

        const editedPostWithPhoto = {
          ...editedProduct,
          photo: uploadedPhoto.fileName,
        };
        await editSportsProducts(editedPostWithPhoto);
        setEditModalOpen(false);
      }
      
      const editedPostWithPhoto = {
        ...editedProduct
      };
      await editSportsProducts(editedPostWithPhoto);
      setEditModalOpen(false);

    } catch (error) {
      console.error("Error uploading file or editing post:", error);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <button className={style['add']}onClick={handleOpenModal}>
        <AddIcon />
      </button>

      {loading ? (
        <CircularProgress />
      ) : (
        <div className={style.main}>
        {products.map((product, index) => (
          <div key={index} className={style['container']}>
            <div className={style['top-section']}>
              <button className={style.edit} onClick={() => handleOpenEditModal(product)}><EditIcon/></button>
              <button className={style.delete} onClick={() => handleDeleteProduct(product.id)}><DeleteIcon/></button>
            </div>
            <div className={style['bottom-section']}>
              <img
                src={"https://localhost:7209/api/File/" + product.photo}
                style={{ width: 200 }}
              />
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <p>{product.price + ' тг'}</p>
            </div>
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
            id="name"
            name="name"
            label="Название"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <textarea
            style={{ overflow: "auto", width: "392px", height: "200px" }}
            placeholder="Описание"
            value={newProduct.desc}
            onChange={(event) =>
              setNewProduct({ ...newProduct, desc: event.target.value })
            }
          ></textarea>
          Цена
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Цена"
            style={{ margin: 10 }}
            onChange={(event) =>
              setNewProduct({ ...newProduct, price: event.target.value })
            }
          ></input>
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
            onClick={handleAcceptProduct}
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
            name="name"
            label="Название"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedProduct.name}
            onChange={(event) =>
              setEditedProduct({ ...editedProduct, name: event.target.value })
            }
          />
          <textarea
            style={{ overflow: "auto", width: "392px", height: "200px" }}
            placeholder="Описание"
            value={editedProduct.desc}
            onChange={(event) =>
              setEditedProduct({ ...editedProduct, desc: event.target.value })
            }
          ></textarea>
          Цена
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Цена"
            value={editedProduct.price}
            style={{ margin: 10 }}
            onChange={(event) =>
              setEditedProduct({ ...editedProduct, price: event.target.value })
            }
          ></input>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="edit-photo-upload"
            type="file"
            onChange={(event) => {
              const file = event.target.files[0];
              setEditedProduct({ ...editedProduct, photo: file });
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
            onClick={handleEditProduct}
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

export default SportProductAdminPage;

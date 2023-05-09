import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Redux/actions";
import { useTranslation } from "react-i18next";

const AjoutCours = ({
  open,
  handleClose,
  listCours,
  setListCours,
  type,
  cours,
  setCours,
}) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [coursFile, setCoursFile] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { t } = useTranslation(["content", "button"]);
  const { handleSubmit, reset, control } = useForm({
    defaultValues:
      type === "modifier"
        ? {
            title: cours.title,
            price: cours.price,
            image: null,
            matiere: cours.matiere,
          }
        : {
            title: "",
            price: "0",
            image: null,
            video:
              "https://www.youtube.com/watch?v=g6x2dZsk8dE&list=RDcLWfCkpTqII&index=15",
            matiere: "",
          },
  });

  const onPDFChange = (event) => {
    setCoursFile(event.target.files[0]);
  };
  const onImageChange = (event) => {
    setSelectedImage(event.target.files);
  };

  const AddCours = (data) => {
    const { title, price, video, matiere } = data;
    const idYoutube = video ? video.split("=")[1].split("&")[0] : "";
    console.log(selectedImage);
    if (type === "ajout") {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("video", idYoutube);
      formData.append("price", price);
      formData.append("matiere", matiere);
      formData.append("idProf", user._id);
      for (let index = 0; index < selectedImage.length; index++) {
        const element = selectedImage[index];
        formData.append("images", element);
      }
      formData.append("images", coursFile);

      axios
        .post(process.env.REACT_APP_URL_BACKEND + "cours", formData)
        .then((response) => {
          setListCours([...listCours, response.data.cours]);
          dispatch({ type: actions.addCours, user: response.data.user });
          localStorage.setItem("user", JSON.stringify(response.data.user));
          reset();
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(process.env.REACT_APP_URL_BACKEND + "cours", {
          title,
          price,
          idCours: cours._id,
          matiere: matiere,
        })
        .then((response) => {
          setCours(response.data.cours);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          dispatch({ type: actions.updateCours, user: response.data.user });
          reset();
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    reset({
      title: type === "modifier" ? cours.title : "",
      price: type === "modifier" ? cours.price : "",
      matiere: type === "modifier" ? cours.matiere : "",
    });
  }, [cours]);

  return (
    <>
      {type === "" ? (
        <Modal
          open={open}
          onClose={handleClose}
          hideBackdrop={true}
          sx={{
            bgcolor: "white",
            height: "500px",
            width: "350px",
            position: "absolute",
            boxShadow: "2px 2px 20px 12px #9032329e",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        ></Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          hideBackdrop={true}
          sx={{
            bgcolor: "white",
            height: "500px",
            width: "350px",
            position: "absolute",
            boxShadow: "2px 2px 20px 12px #9032329e",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            height={"100%"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <IconButton
              sx={{ position: "absolute", top: "0", right: "0" }}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon color="error" />
            </IconButton>

            <Typography>
              {type === "ajout" ? t("button:add") : t("button:edit")}{" "}
              {t("content:cours")}
            </Typography>

            <form onSubmit={handleSubmit(AddCours)}>
              <Stack justifyContent={"center"} width={"100%"} spacing={1}>
                <Controller
                  name="title"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error && error.message}
                      id="outlined-basic"
                      label={t("content:title")}
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <TextField
                      value={value}
                      type={"number"}
                      onChange={onChange}
                      error={!!error}
                      helperText={error && error.message}
                      id="outlined-basic"
                      label={t("content:price")}
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name="matiere"
                  control={control}
                  defaultValue={type === "modifier" ? cours.matiere : ""}
                  rules={{ required: true }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {t("content:lesson")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label={t("content:lesson")}
                        onChange={onChange}
                        error={!!error}
                        helperText={error && error.message}
                      >
                        <MenuItem value={"C++"}>C++</MenuItem>
                        <MenuItem value={"html"}>HTML</MenuItem>
                        <MenuItem value={"java"}>Java</MenuItem>
                        <MenuItem value={"js"}>Javascript</MenuItem>
                        <MenuItem value={"python"}>Python</MenuItem>
                        <MenuItem value={"react"}>React</MenuItem>
                        <MenuItem value={"marketingDigital"}>
                          MarketingDigital
                        </MenuItem>
                        <MenuItem value={"intelligenceArtificielle"}>
                          IntelligenceArtificielle
                        </MenuItem>
                        <MenuItem value={"gestion"}>Gestion</MenuItem>
                        <MenuItem value={"electrique"}>Electrique</MenuItem>
                        <MenuItem value={"management"}>Management</MenuItem>
                        <MenuItem value={"bigdata "}>Bigdata </MenuItem>
                        <MenuItem value={"cloud"}>Cloud </MenuItem>
                        <MenuItem value={"anglais"}>Anglais</MenuItem>
                        <MenuItem value={"math"}>Math</MenuItem>
                        <MenuItem value={"automate"}>Automate</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />

                {type === "ajout" && (
                  <Stack>
                    <label htmlFor="coursFile">{t("content:courseFile")}</label>
                    <input
                      id="coursFile"
                      accept=".pdf"
                      type={"file"}
                      onChange={(event) => {
                        onPDFChange(event);
                      }}
                    />
                    <label htmlFor="coursImage">
                      {t("content:courseImage")}
                    </label>
                    <input
                      id="coursImage"
                      accept="image/png, image/jpeg"
                      type={"file"}
                      onChange={(event) => {
                        onImageChange(event);
                      }}
                    />
                    <Controller
                      name="video"
                      control={control}
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => (
                        <TextField
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          helperText={error && error.message}
                          id="outlined-basic"
                          label={t("content:video")}
                          variant="outlined"
                        />
                      )}
                    />
                  </Stack>
                )}

                <Box>
                  <Button
                    type="reset"
                    variant="outlined"
                    color="warning"
                    onClick={() => {
                      reset();
                    }}
                  >
                    {t("button:reset")}
                  </Button>
                  <Button variant="outlined" color="success" type={"submit"}>
                    {type === "ajout" ? t("button:add") : t("button:edit")}
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AjoutCours;

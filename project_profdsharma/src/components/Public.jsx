import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaAngleDoubleRight,
  FaHome,
  FaBook,
  FaEye,
  FaComments,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Topheader from "./Topheader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Public = () => {
  const [video, setvideo] = useState([]);
  const [pageToken, setPageToken] = useState("1");
  const [Token, setToken] = useState("None");
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function getPageNumberFromUrl(url) {
    const params = new URLSearchParams(url.split("?")[1]);
    const page = parseInt(params.get("page"));
    return isNaN(page) ? 1 : page;
  }
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/home/video/?page=${pageToken}`)
      .then((res) => {
        const { results, next } = res.data;
        setvideo([...video, ...results]);
        setToken(getPageNumberFromUrl(next));
        if (next === null) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageToken]);
  // console.log(video);

  return (
    <>
      <section>
        <Topheader
          title="Public Opinion"
          subtitle="Public Opinion"
          address=""
        />
        <main>
          <section>
            {video && (
              <div className="py-4 container-fluid">
                <div className="container">
                  <div className="video-row row  justify-content-center">
                    {video.map((data, index) => (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6 p-2"
                        key={index}
                      >
                        <Card className={`mycard`} onClick={handleOpen}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image={data.thumbnail}
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {data.title.slice(0, 30)} ...
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Modal>
            </div>
            {Token && (
              <div className="d-flex py-4 my-2 justify-content-center">
                <button
                  className="btn btn-danger"
                  onClick={() => setPageToken(Token)}
                >
                  Load More
                </button>

                {/* <Stack spacing={2}>
                  <Pagination count={10} color="primary" />
                </Stack> */}
              </div>
            )}
          </section>
        </main>
      </section>
    </>
  );
};
export default Public;

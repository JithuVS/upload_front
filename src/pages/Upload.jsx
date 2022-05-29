import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import logo from "../upload.ico";
import { ToastContainer, toast } from "react-toastify";
import axios from "../axios/axios.js";

function Upload() {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "/",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user}`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    getDetails();
  }, []);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const upLoad = async (e) => {
    if (file) {
      const formData = new FormData();
      formData.append("fileName", file);
      try {
        const res = await axios.post("/upload", formData);
        toast.info("image uploaded!", {
          position: "bottom-right",
        });
        fileRef.current.value = null;
      } catch (error) {
        toast.error(error, {
          position: "bottom-right",
        });
      }
    } else {
      toast.error("Please select an image to upload", {
        position: "bottom-right",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < 8; i++) {
      formData.append(
        event.currentTarget[i].name,
        event.currentTarget[i].value
      );
    }
    formData.append("fileName", file);
    try {
      const res = await axios.post("/upload", formData, {
        withCredentials: true,
      });
      toast.info("image uploaded!", {
        position: "bottom-right",
      });
      getDetails();
      fileRef.current.value = null;
    } catch (error) {
      toast.error(error, {
        position: "bottom-right",
      });
    }
  };

  const getDetails = async () => {
    try {
      const res = await axios.get("/get", {
        withCredentials: true,
      });
      if (res) {
        setDetails(res.data);

        toast.info("Data received!", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <button className="logout" onClick={logOut}>
        Log Out
      </button>
      <div className="container" style={{ display: "flex", gap: "2%" }}>
        <form
          className="container"
          style={{ height: "auto" }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            defaultValue="company"
            type="text"
            placeholder="company"
            name="company"
          ></input>
          <input
            defaultValue="owner"
            type="text"
            placeholder="owner"
            name="owner"
          ></input>
          <input
            defaultValue="name"
            type="text"
            placeholder="name"
            name="name"
          ></input>
          <input
            defaultValue="status"
            type="text"
            placeholder="status"
            name="status"
          ></input>
          <input
            defaultValue="language"
            type="text"
            placeholder="language"
            name="language"
          ></input>
          <input
            defaultValue="note"
            type="text"
            placeholder="note"
            name="note"
          ></input>
          <input
            ref={fileRef}
            type="file"
            onChange={saveFile}
            name="fileName"
          ></input>
          <button type="submit">Submit</button>{" "}
          <img
            style={{
              cursor: "pointer",
              width: "20%",
              position: "relative",
              left: "90%",
            }}
            src={logo}
            alt="Logo"
            onClick={upLoad}
          />
        </form>
        <div
          className="container"
          style={{ flex: "1", textAlign: "center", borderStyle: "groove" }}
        >
          <button onClick={getDetails} style={{ marginBottom: "2rem" }}>
            get Records
          </button>
          <div className="containerflex">
            {details &&
              details.map((item) => {
                return (
                  <div className="item" key={item._id}>
                    <img
                      src={item.url}
                      style={{ width: "100%", height: "60%" }}
                    ></img>
                    <br></br>
                    <hr></hr>
                    <div
                      style={{
                        textAlign: "left",
                        backgroundColor: "cadetblue",
                      }}
                    >
                      <table style={{ wordBreak: "break-all" }}>
                        <tbody>
                          <tr>
                            <td>Asset</td>
                            <td>{item.asset_id}</td>
                          </tr>
                          <tr>
                            <td>Company</td>
                            <td>{item.company}</td>
                          </tr>
                          <tr>
                            <td>Name</td>
                            <td>{item.name}</td>
                          </tr>
                          <tr>
                            <td>Owner</td>
                            <td>{item.owner}</td>
                          </tr>
                          <tr>
                            <td>Type</td>
                            <td>{item.resource_type}</td>
                          </tr>
                          <tr>
                            <td>Extension</td>
                            <td>{item.original_extension}</td>
                          </tr>
                          <tr>
                            <td>version</td>
                            <td>{item.version}</td>
                          </tr>
                          <tr>
                            <td>note</td>
                            <td>{item.note}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Upload;

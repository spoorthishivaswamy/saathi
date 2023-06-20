import React, { useEffect, useState } from "react";
import ModalWithImg from "./pureComponents/Modal/Modal";
import { Box, TextField, Typography } from "@mui/material";
import { GoalContext } from "./context/createGoalContext";
import getImages from "./services/api/getImages";
import { constructItemData, formatter, uniqueId } from "./services/helpers";
import BasicImageList from "./pureComponents/ImageList/ImageList";
import { collection, addDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import {
  goalAmountLabel,
  goalAmountSavedLabel,
  goalAmountToBeSavedLabel,
  goalDurationLabel,
  goalLabel,
} from "./constants";
import BasicTable from "./pureComponents/Table/Table";
import addDocument from "./services/firebase/addDoc";
import getDoc from "./services/firebase/retrieveDoc";
import getDocument from "./services/firebase/getDoc";

function App() {
  const [goal, setGoal] = useState({});
  const [searchText, setSearchText] = useState("");
  const [imgList, setImgList] = useState([]);
  const [goalAmount, setGoalAmount] = useState();
  const [goalDuration, setGoalDuration] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [amtToSave, setAmtSave] = useState();
  const [rows, setRows] = useState([{}]);
  const [blur, setBlur] = useState(false);

  const handleGoalKeyPress = (e) => {
    if (e.key === "Enter") {
      getImages(searchText).then((data) => {
        setImgList(constructItemData(data.results));
      });
    }
  };

  const handleGoal = (e) => {
    setSearchText(e.target.value);
  };

  const handleGoalAmount = (e) => {
    setGoalAmount(e.target.value);
  };
  const handleGoalDuration = (e) => {
    setGoalDuration(e.target.value);
  };

  useEffect(() => {
    getDocument().then((row) => {
      setRows(row);
    });
  }, [goalAmount]);

  useEffect(() => {
    if (goalAmount && goalDuration) {
      setAmtSave(goalAmount / goalDuration);
    }
  });

  return (
    <GoalContext.Provider value={{ goal, setGoal }}>
      <div className="App">
        <Box className="title">
          <img className="logo" alt="" src={process.env.REACT_APP_LOGO} />
        </Box>
        <Box className="body">
          <ModalWithImg
            onButtonClick={() => {
              addDocument({
                goalAmt: goalAmount,
                goalCurrency: "INR",
                goalDuration: goalDuration,
                goalId: uniqueId(),
                goalImgURL: imgUrl,
                goalName: searchText,
                goalState: "NEW",
                goalAmtToSave: amtToSave,
                isDelete:"false"
              });
              getDocument().then((row) => {
                setRows(row);
              });
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              Create Goal
            </Typography>
            <TextField
              label={goalLabel}
              required
              variant="standard"
              fullWidth
              value={searchText}
              onChange={handleGoal}
              onKeyDown={handleGoalKeyPress}
            />
            <TextField
              label={goalAmountLabel}
              required
              variant="standard"
              fullWidth
              value={goalAmount}
              type="number"
              onChange={handleGoalAmount}
            />
            <TextField
              label={goalDurationLabel}
              required
              variant="standard"
              fullWidth
              value={goalDuration}
              type="number"
              onChange={handleGoalDuration}
            />
            <TextField
              // label={goalAmountToBeSavedLabel}
              variant="standard"
              fullWidth
              value={amtToSave}
              type="number"
              InputProps={{
                readOnly: true,
              }}
            />
            <BasicImageList
              itemData={imgList}
              onClick={(e) => {
                setImgUrl(e.target.getAttribute("src"));
              }}
            />
          </ModalWithImg>
          <BasicTable
            rows={rows}
            deleteOnClick={() => {
              getDocument().then((row) => setRows(row));
            }}
          />
        </Box>
      </div>
    </GoalContext.Provider>
  );
}

export default App;

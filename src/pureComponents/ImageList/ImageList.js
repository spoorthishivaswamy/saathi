import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./ImageList.scss";

export default function BasicImageList({ itemData, onClick, blur }) {
  React.useEffect(() => {
    const imageList = document.getElementById("imageList");
    const images = imageList.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener("click", selectImage);
    }

    function selectImage(event) {
      // Remove any existing selected class from other images
      for (let i = 0; i < images.length; i++) {
        images[i].classList.remove("selected");
      }

      // Add selected class to the clicked image
      event.target.classList.add("selected");

    }
  });
  return (
    <ImageList
      sx={{ width: 500, height: 450 }}
      variant="masonry"
      cols={3}
      gap={8}
      id="imageList"
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} style={{ cursor: "pointer" }}>
          <img
            src={`${item.img}?w=161&fit=crop&auto=format`}
            srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            onClick={onClick}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export const constructItemData = (itemList) => {
  let newItemList = [];
  itemList.map((item, i) => {
    const itemJson = {
      img: "",
      title: "",
    };
    itemJson.img = item.urls.small;
    itemJson.title = item.alt_description;
    newItemList.push(itemJson);
  });
  return newItemList;
};

export const uniqueId = (length=16) => { return parseInt(Math. ceil(Math. random() * Date. now()))}

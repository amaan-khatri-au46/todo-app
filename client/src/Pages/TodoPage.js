import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TodoPage.css";

const TodoPage = () => {
  const [itemText, setItemText] = useState("");

  // Here Is Bascially Our List So We Need
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

  // Add Item Fetching
  // With This The Item Will Be Add Successfull
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/item", {
        item: itemText,
      });
      //   console.log(res);
      setListItems((prev) => [...prev, res.data]);
      // Here We Will Again Set It...
      setItemText("");
    } catch (error) {
      console.log(error);
    }
  };

  // Use Effect Hook Will Be Called Every Time ...
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/items");
        // console.log(res.data);
        setListItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItemsList();
  }, []);

  //   Delete Item On Button Click

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/item/${id}`);
      const newListItem = listItems.filter((item) => item._id !== id);
      setListItems(newListItem);
    } catch (error) {
      console.log(error);
    }
  };

  //Update item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/api/item/${isUpdating}`,
        { item: updateItemText }
      );
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = (listItems[updatedItemIndex].item = updateItemText);
      console.log(updatedItem);
      setUpdateItemText("");
      setIsUpdating("");
      
    } catch (err) {
      console.log(err);
    }
  };
  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <div className="App">
      <h1>To Do List</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add To Do Item"
          onChange={(e) => setItemText(e.target.value)}
          value={itemText}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item) => (
          <div className="todo-item">
            {isUpdating === item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-item"
                  onClick={() => {
                    setIsUpdating(item._id);
                  }}
                >
                  update
                </button>
                <button
                  className="delete-item"
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;

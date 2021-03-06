import React, { useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newForm, setNewForm] = useState(false);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    setNewForm(!newForm);
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        let newColors = colors.filter((c) => {
          return c.id !== colorToEdit.id;
        });
        updateColors([...newColors, colorToEdit]);
      });
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then((res) => {
        let newColors = colors.filter((c) => {
          return c.id !== color.id;
        });
        updateColors(newColors);
      })
      .catch((err) => console.log(err));
  };

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/colors", newColor)
      .then((res) => {
        updateColors([...colors, newColor]);
        setNewColor(initialColor);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <button onClick={() => setNewForm(!newForm)}>New</button>
      {newForm && (
        <form onSubmit={addColor}>
          <legend>New color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value },
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Create</button>
            <button onClick={() => setNewForm(false)}>cancel</button>
          </div>
        </form>
      )}
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;

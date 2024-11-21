import React from "react";

function FormEditor({ field, index, updateField }) {
  const handleLabelChange = (e) => {
    updateField(index, { ...field, label: e.target.value });
  };

  const renderField = () => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={field.label}
            className="w-full p-2 border rounded"
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder={field.label}
            className="w-full p-2 border rounded"
          ></textarea>
        );
      case "checkbox":
        return (
          <label className="flex justify-center items-center">
            <input type="checkbox" className="mr-2" /> {field.label}
          </label>
        );
      case "radio":
        return (
          <label className="flex items-center">
            <input type="radio" className="mr-2" /> {field.label}
          </label>
        );
      case "select":
        return (
          <select className="w-full p-2 border rounded">
            <option>{field.label}</option>
          </select>
        );
      case "button":
        return (
          <button className="p-2 bg-blue-500 text-white rounded">
            {field.label}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex align-center items-start gap-4 mb-4">
      <input
        type="text"
        value={field.label}
        onChange={handleLabelChange}
        placeholder="Edit label"
        className="p-2 border rounded"
      />
      {renderField()}
    </div>
  );
}

export default FormEditor;

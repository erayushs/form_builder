import React, { useState } from "react";
import FormEditor from "./components/FormEditor";

const defaultFields = [
  { id: "text", label: "Text Input", type: "text" },
  { id: "textarea", label: "Text Area", type: "textarea" },
  { id: "checkbox", label: "Checkbox", type: "checkbox" },
  { id: "radio", label: "Radio Button", type: "radio" },
  { id: "select", label: "Dropdown", type: "select" },
  { id: "button", label: "Button", type: "button" },
];

// Some changes need to be there for select (dropdown)...

function App() {
  const [formFields, setFormFields] = useState([]);
  const [isFormCreated, setIsFormCreated] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const fieldId = e.dataTransfer.getData("fieldId");
    const field = defaultFields.find((f) => f.id === fieldId);
    setFormFields((prevFields) => [
      ...prevFields,
      { ...field, id: Date.now(), label: field.label },
    ]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleFieldUpdate = (index, updatedField) => {
    const updatedFields = [...formFields];
    updatedFields[index] = updatedField;
    setFormFields(updatedFields);
  };

  const handleCreateForm = () => setIsFormCreated(true);

  const handleDeleteForm = () => {
    setFormFields([]);
    setIsFormCreated(false);
  };

  return (
    <div className="bg-gray-200">
      <h1 className="text-center text-3xl font-semibold pt-4">Form Builder</h1>
      <div className="flex flex-col gap-4 p-6  min-h-screen">
        {/* Field Palette */}
        <div className="grid lg:grid-cols-6 lg:gap-10 sm:grid-cols-1 sm:gap-0  bg-white rounded-lg shadow-md p-4">
          {defaultFields.map((field) => (
            <div
              key={field.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("fieldId", field.id)}
              className="p-2 mb-3 bg-blue-500 text-white text-center rounded cursor-grab hover:bg-blue-600"
            >
              {field.label}
            </div>
          ))}
        </div>

        {/* Form Preview */}
        <div
          className="w-full h-screen bg-white rounded-lg shadow-md p-4"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h2 className="text-xl font-semibold text-center mb-4">Preview</h2>
          {!isFormCreated ? (
            <>
              {formFields.map((field, index) => (
                <FormEditor
                  key={field.id}
                  field={field}
                  index={index}
                  updateField={handleFieldUpdate}
                />
              ))}
              {formFields.length > 0 && (
                <button
                  className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                  onClick={handleCreateForm}
                >
                  Create Form
                </button>
              )}
            </>
          ) : (
            <>
              {formFields.map((field) => (
                <div key={field.id} className="mb-4">
                  {(field.type === "text" || field.type === "textarea") && (
                    <label className="block mb-1 text-gray-700">
                      {field.label}
                    </label>
                  )}

                  {field.type === "text" && (
                    <input type="text" className="w-full p-2 border rounded" />
                  )}
                  {field.type === "textarea" && (
                    <textarea className="w-full p-2 border rounded"></textarea>
                  )}
                  {field.type === "checkbox" && (
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      {field.label}
                    </label>
                  )}
                  {field.type === "radio" && (
                    <label className="flex items-center">
                      <input type="radio" className="mr-2" />
                      {field.label}
                    </label>
                  )}
                  {field.type === "select" && (
                    <select className="w-full p-2 border rounded">
                      <option>{field.label}</option>
                    </select>
                  )}
                  {field.type === "button" && (
                    <button className="p-2 bg-gray-300 rounded">
                      {field.label}
                    </button>
                  )}
                </div>
              ))}
              <button
                className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDeleteForm}
              >
                Delete Form
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

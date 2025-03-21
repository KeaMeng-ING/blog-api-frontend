import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    excerpt: "",
    categoryId: "",
    readTime: "",
    isPublished: false,
    isFeatured: false,
    imageUrl: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // This will be a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageData;

      // Convert image to base64 for database storage
      if (image) {
        imageData = imagePreview; // Use the base64 string we created in handleImageChange
      }

      // Create the data object to send to the API
      const postData = {
        ...formData,
        imageUrl: imageData, // Store the base64 image data
      };

      console.log(postData);

      const response = await axios.post(
        "http://localhost:3000/api/posts/create",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { data } = response;

      console.log(data);
      navigate(`/posts/${data.id}`);
    } catch (err) {
      console.error("Error creating post:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title field */}

        <div className="space-y-2">
          <label htmlFor="title" className="block font-medium">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Subtitle field */}
        <div className="space-y-2">
          <label htmlFor="subtitle" className="block font-medium">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Content field */}
        <div className="space-y-2">
          <label htmlFor="content" className="block font-medium">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Excerpt field */}
        <div className="space-y-2">
          <label htmlFor="excerpt" className="block font-medium">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Category field */}

        <div className="space-y-2">
          <label htmlFor="categoryId" className="block font-medium">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">Select a category</option>
            {/* You would populate these options from your categories data */}
            <option value="cm8gza3250000wpg7a6w3ezbl">Technology</option>
            <option value="cm8gzykze0000wpyh4mi6pktt">Business</option>
            <option value="cm8gzz1co0001wpyhcld5gw10">Lifestyle</option>
            <option value="cm8gzz65o0002wpyhz39qbynk">Education</option>
            <option value="cm8gzze7q0003wpyhcht6bbl3">Entertainment</option>
          </select>
        </div>

        {/* Read time field */}
        <div className="space-y-2">
          <label htmlFor="readTime" className="block font-medium">
            Read Time (minutes)
          </label>
          <input
            type="number"
            id="readTime"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            min="1"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Image field */}
        <div className="space-y-2">
          <label htmlFor="imageUrl" className="block font-medium">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-40 rounded-md"
              />
            </div>
          )}
        </div>

        {/* Toggle fields */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isPublished"
              className="ml-2 block text-sm text-white"
            >
              Publish immediately
            </label>
          </div>
        </div>

        {/* Submit and Cancel buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/posts")}
            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import '../css/modal.css';

const ModalData = ({ isOpen, onClose, onSubmit, initialData = {}, isUpdateMode }) => {
  const countriesData = [
    { country: 'Nigeria', latitude: 9.082, longitude: 8.675 },
    { country: 'Kenya', latitude: -1.286, longitude: 36.817 },
    { country: 'South Africa', latitude: -25.746, longitude: 28.188 },
    { country: 'Ethiopia', latitude: 9.145, longitude: 40.489 },
    { country: 'Algeria', latitude: 28.033, longitude: 1.659 },
    { country: 'Morocco', latitude: 31.791, longitude: -7.092 },
    { country: 'Sudan', latitude: 12.862, longitude: 30.217 },
    { country: 'Tanzania', latitude: -6.369, longitude: 34.888 },
    { country: 'Uganda', latitude: 1.373, longitude: 32.29 },
    { country: 'Angola', latitude: -11.202, longitude: 17.873 },
    { country: 'Mozambique', latitude: -18.665, longitude: 35.529 },
    { country: 'Zambia', latitude: -13.134, longitude: 27.849 },
    { country: 'Zimbabwe', latitude: -19.015, longitude: 29.154 },
    { country: 'Cameroon', latitude: 3.848, longitude: 11.502 },
    { country: 'Senegal', latitude: 14.497, longitude: -14.452 },
    { country: 'Chad', latitude: 15.455, longitude: 18.734 },
    { country: 'Niger', latitude: 17.607, longitude: 8.081 },
    { country: 'Burkina Faso', latitude: 12.238, longitude: -1.561 },
    { country: 'Somalia', latitude: 5.152, longitude: 46.199 },
    { country: 'Congo', latitude: -0.228, longitude: 15.827 },
    { country: 'Rwanda', latitude: -1.94, longitude: 29.873 },
    { country: 'Botswana', latitude: -22.328, longitude: 24.684 },
  ];

  const [formData, setFormData] = useState({
    country: '',
    year: '',
    child_stunting: '',
    child_wasting: '',
    undernourishment: '',
    child_mortality: '',
    ghi: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    if (isUpdateMode && initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        country: '',
        year: '',
        child_stunting: '',
        child_wasting: '',
        undernourishment: '',
        child_mortality: '',
        ghi: '',
        latitude: '',
        longitude: '',
      });
    }
  }, [isUpdateMode, initialData]);

  // 필드 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 새 필드 값 설정
    let updatedFormData = { ...formData, [name]: value };

    // 나라가 변경되면 위도와 경도를 자동 설정
    if (name === 'country') {
      const selectedCountry = countriesData.find((c) => c.country === value);
      if (selectedCountry) {
        updatedFormData = {
          ...updatedFormData,
          latitude: selectedCountry.latitude,
          longitude: selectedCountry.longitude,
        };
      } else {
        updatedFormData = { ...updatedFormData, latitude: '', longitude: '' };
      }
    }

    // GHI 값 자동 계산
    if (['child_stunting', 'child_wasting', 'undernourishment', 'child_mortality'].includes(name)) {
      updatedFormData.ghi = calculateGHI(updatedFormData);
    }

    setFormData(updatedFormData);
  };

  // GHI 계산하는 함수
  const calculateGHI = ({ undernourishment, child_stunting, child_wasting, child_mortality }) => {
    const u = parseFloat(undernourishment) || 0;
    const s = parseFloat(child_stunting) || 0;
    const w = parseFloat(child_wasting) || 0;
    const m = parseFloat(child_mortality) || 0;

    return ((1 / 3) * u + (1 / 6) * s + (1 / 6) * w + (1 / 3) * m).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <h2>{isUpdateMode ? 'Update Record' : 'Add Record'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Country:
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="filter_select"
            >
              <option value=""></option>
              {countriesData.map((country) => (
                <option key={country.country} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Year:
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="filter_select"
            >
              <option value=""></option>
              <option value="2011">2011</option>
              <option value="2015">2015</option>
              <option value="2019">2019</option>
              <option value="2023">2023</option>
            </select>
          </label>
          <br />

          <label>
            Child Stunting:
            <input
              name="child_stunting"
              type="number"
              step="0.1"
              value={formData.child_stunting}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Child Wasting:
            <input
              name="child_wasting"
              type="number"
              step="0.1"
              value={formData.child_wasting}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Undernourishment:
            <input
              name="undernourishment"
              type="number"
              step="0.1"
              value={formData.undernourishment}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Child Mortality:
            <input
              name="child_mortality"
              type="number"
              step="0.1"
              value={formData.child_mortality}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            GHI (calculated):
            <input
              name="ghi"
              type="number"
              value={formData.ghi}
              readOnly
            />
          </label>
          <br />

          <label>
            Latitude:
            <input
              name="latitude"
              type="number"
              value={formData.latitude}
              readOnly
            />
          </label>
          <br />

          <label>
            Longitude:
            <input
              name="longitude"
              type="number"
              value={formData.longitude}
              readOnly
            />
          </label>
          <br />

          <button className="modal_button" type="submit">
            {isUpdateMode ? 'Update' : 'Add'}
          </button>
          <button className="modal_button" type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalData;

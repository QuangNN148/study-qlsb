import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001/api'; // Thay bằng URL API thực tế

// API Functions
async function fetchSanBong(tukhoa = '') {
  const url = tukhoa ? `${API_BASE_URL}/san-bong?tukhoa=${encodeURIComponent(tukhoa)}` : `${API_BASE_URL}/san-bong`;
  const res = await fetch(url);
  return res.json();
}

async function createSanBong(data) {
  const res = await fetch(`${API_BASE_URL}/san-bong`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function updateSanBong(id, data) {
  const res = await fetch(`${API_BASE_URL}/san-bong/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function deleteSanBong(id) {
  const res = await fetch(`${API_BASE_URL}/san-bong/${id}`, { method: 'DELETE' });
  return res.json();
}

function SanBongPage() {
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ten_san: '', loai_san: '', mo_ta: '', gia_thue_theo_gio: 0 });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Load initial data
  useEffect(() => {
    loadSanBong();
  }, []);

  // Load sân bóng data
  async function loadSanBong(tukhoa = '') {
    try {
      const data = await fetchSanBong(tukhoa);
      setList(data);
      setEditing(null);
      if (data.length === 0 && tukhoa) {
        setError('Không tìm thấy sân bóng.');
        setMessage('');
      } else {
        setError('');
        setMessage('');
      }
    } catch (err) {
      setError('Lỗi khi tải danh sách sân bóng.');
    }
  }

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    await loadSanBong(keyword);
  };

  // Edit handler
  const handleEdit = (sb) => {
    setEditing(sb);
    setForm({
      ten_san: sb.ten_san,
      loai_san: sb.loai_san,
      mo_ta: sb.mo_ta || '',
      gia_thue_theo_gio: Number(sb.gia_thue_theo_gio)
    });
    setMessage('');
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateSanBong(editing.id, form);
        setMessage('Cập nhật thành công!');
        setEditing(null);
      } else {
        await createSanBong(form);
        setMessage('Thêm mới thành công!');
        setForm({ ten_san: '', loai_san: '', mo_ta: '', gia_thue_theo_gio: 0 });
      }
      await loadSanBong();
    } catch (err) {
      setError('Lỗi khi lưu sân bóng.');
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteSanBong(deleteId);
      setMessage('Xóa thành công!');
      await loadSanBong();
    } catch (err) {
      setError('Lỗi khi xóa sân bóng.');
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditing(null);
    setForm({ ten_san: '', loai_san: '', mo_ta: '', gia_thue_theo_gio: 0 });
    setMessage('');
    setError('');
  };

  return (
    <div>
      <h1>Quản lý sân bóng</h1>
      <p>Thêm, sửa, xóa và tìm kiếm sân bóng mini.</p>

      {/* Tìm kiếm sân bóng */}
      <section>
        <h2>Tìm kiếm sân bóng</h2>
        <form onSubmit={handleSearch}>
          <input
            placeholder="Nhập tên sân bóng..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">Tìm kiếm</button>
        </form>
        {message && <div>{message}</div>}
        {error && <div>{error}</div>}
      </section>

      {/* Thêm/Sửa sân bóng */}
      <section>
        <h2>{editing ? 'Sửa sân bóng' : 'Thêm sân bóng'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Tên sân bóng"
            value={form.ten_san}
            onChange={(e) => setForm({ ...form, ten_san: e.target.value })}
            required
          />
          <input
            placeholder="Loại sân (7, 11)"
            value={form.loai_san}
            onChange={(e) => setForm({ ...form, loai_san: e.target.value })}
            required
          />
          <input
            placeholder="Mô tả"
            value={form.mo_ta}
            onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
          />
          <input
            type="number"
            min="0"
            placeholder="Giá thuê (VNĐ)"
            value={form.gia_thue_theo_gio}
            onChange={(e) => setForm({ ...form, gia_thue_theo_gio: Number(e.target.value) })}
            required
          />
          <button type="submit">{editing ? 'Cập nhật' : 'Thêm'}</button>
          {editing && <button type="button" onClick={handleCancel}>Hủy</button>}
        </form>
      </section>

      {/* Danh sách sân bóng */}
      <section>
        <h2>Danh sách sân bóng</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sân</th>
              <th>Loại sân</th>
              <th>Mô tả</th>
              <th>Giá thuê</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {list.map((sb) => (
              <tr key={sb.id}>
                <td>{sb.id}</td>
                <td>{sb.ten_san}</td>
                <td>{sb.loai_san}</td>
                <td>{sb.mo_ta || ''}</td>
                <td>{Number(sb.gia_thue_theo_gio).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>
                  <button onClick={() => handleEdit(sb)}>Sửa</button>
                  <button onClick={() => handleDelete(sb.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal xác nhận xóa */}
      {showDeleteModal && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', border: '1px solid #000', zIndex: 1000 }}>
          <p>Bạn chắc chắn muốn xóa?</p>
          <button onClick={confirmDelete}>Xóa</button>
          <button onClick={cancelDelete}>Hủy</button>
        </div>
      )}
    </div>
  );
}


export default SanBongPage;
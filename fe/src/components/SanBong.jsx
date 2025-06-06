import React, { useEffect, useState } from 'react';

function GetListSb() {
  const [data, setData] = useState([]);

  useEffect(()=> {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3001/api/san-bong');
      const data = await res.json();
      setData(data);
    }
    fetchData();
  },[]);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên Sân</th>
          <th>Loại Sân</th>
          <th>Mô Tả</th>
          <th>Giá Thuê Theo Giờ</th>
        </tr>
      </thead>
      <tbody>
        {data.map((sb) => (
          <tr key={sb.id}>
            <td>{sb.id}</td>
            <td>{sb.ten_san}</td>
            <td>{sb.loai_san}</td>
            <td>{sb.mo_ta}</td>
            <td>{sb.gia_thue_theo_gio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GetListSb;
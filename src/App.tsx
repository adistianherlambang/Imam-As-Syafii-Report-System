import { useState, useRef} from 'react';
import './App.css';
import CustomSelect from './CustomSelect';

function App() {
  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    rincian: '',
    tanggalLokasi: '',
    option: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [fileName, setFileName] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      console.log("Updated formData:", updated);
      return updated;
    });
  };

  const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      // setFileName(file.name);
      setFile(file);
    } else {
      setImagePreview(null);
      // setFileName('');
      setFile(null);
    }
  };

  const imgRef = useRef<HTMLInputElement | null>(null);

  const imageHandler = () => {
    imgRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });
      if (file) {
        form.append('image', file);
      }
      // const res = await fetch('http://localhost:3000/', {
      //   method: 'POST',
      //   body: form
      // });
      // const result = await res.json();
      // alert(result.message);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Gagal mengirim pengaduan:', err);
    }
  };

  return (
    <>
      <div className='container' style={isSubmitted ? {display: 'none'} : {display: 'block'}}>
        <div className='titleContainer'>
          <p className='title'>Suara Anda Penting</p>
          <p className='text'>Sampaikan pengaduan atau keluhan kerja secara langsung dan aman</p>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <div className='name'>
            <div className='inputContainer'>
              <label htmlFor="nama">Nama Lengkap<span style={{color: "red"}}>*</span></label>
              <input type="text" id='nama' name="nama" className='input' placeholder='Nama Lengkap' onChange={handleChange} />
            </div>
            <div className='inputContainer'>
              <label>NIP<span style={{color: "red"}}>*</span></label>
              <input type="text" name="nip" className='input' placeholder='NIP' onChange={handleChange} />
            </div>
          </div>
          <div className='inputContainer'>
            <label>Jenis Pengaduan<span style={{color: "red"}}>*</span></label>
            <CustomSelect
              name="option"
              value={formData.option}
              onChange={(value) => handleSelectChange("option", value)}
              options={["Fasilitas dan Sarpras", "Disiplin Pegawai", "Sistem Pendidikan"]}
              placeholder="Pilih jenis pengaduan"
            />
          </div>
          <div className='inputContainer'>
            <label>Rincian Kejadian<span style={{color: "red"}}>*</span></label>
            <textarea className='input kejadian' name="rincian" placeholder='Rincian Kejadian' onChange={handleChange}></textarea>
          </div>
          <div className='inputContainer'>
            <label>Tanggal & Waktu Kejadian<span style={{color: "red"}}>*</span></label>
            <input type="text" className='input' name="tanggalLokasi" placeholder='Tanggal & Lokasi Kejadian' onChange={handleChange} />
          </div>
          <div className='inputContainer'>
            <label>Upload Foto<span style={{color: "red"}}>*</span></label>
            {imagePreview ? (
              <div className='input imgContainer'>
                <img
                  className='img'
                  src={imagePreview}
                  alt="Preview"
                />
              </div>
            ) : (
              <div className='input image' onClick={imageHandler}>
                <label style={{opacity: '0.5', fontSize: '0.75rem'}}>Upload Foto Kejadian</label>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.09 8.60003C21 8.39003 20.88 8.20003 20.75 8.01003C20.28 7.32003 19.59 6.70003 18.61 5.82003L14.65 2.26003C13.56 1.28003 12.89 0.660031 12.03 0.330031C11.18 -0.00996912 10.25 3.08641e-05 8.78 3.08641e-05C6.91 3.08641e-05 5.42 3.08603e-05 4.27 0.150031C3.09 0.310031 2.14 0.640031 1.39 1.39003C0.64 2.14003 0.31 3.09003 0.15 4.26003C0 5.41003 0 6.89003 0 8.75003V12.75C0 14.61 0 16.09 0.15 17.24C0.31 18.41 0.64 19.36 1.39 20.11L2.45 19.05C2.03 18.63 1.77 18.05 1.64 17.04C1.5 16.01 1.5 14.66 1.5 12.75V8.75003C1.5 6.84003 1.5 5.49003 1.64 4.46003C1.78 3.45003 2.03 2.87003 2.45 2.45003C2.87 2.03003 3.46 1.77003 4.47 1.64003C5.5 1.50003 6.87 1.50003 8.78 1.50003C9.91 1.50003 10.54 1.50003 11 1.59003V3.75003C11 6.23003 11 7.60003 11.95 8.55003C12.9 9.50003 14.27 9.50003 16.75 9.50003H19.82C19.98 10.05 20 10.77 20 12.31V12.75C20 14.66 20 16.01 19.86 17.04C19.73 18.04 19.47 18.62 19.05 19.05C18.63 19.47 18.05 19.73 17.04 19.86C16.01 20 14.66 20 12.75 20H8.75C6.84 20 5.49 20 4.46 19.86C3.45 19.73 2.87 19.47 2.45 19.05L1.39 20.11C2.14 20.86 3.09 21.19 4.26 21.35C5.41 21.51 6.88 21.5 8.75 21.5H12.75C14.61 21.5 16.09 21.5 17.24 21.35C18.41 21.19 19.36 20.86 20.11 20.11C20.86 19.36 21.19 18.41 21.35 17.24C21.51 16.09 21.5 14.62 21.5 12.75V12.31C21.5 10.62 21.52 9.55003 21.09 8.60003ZM13.01 7.49003C12.52 7.00003 12.5 6.05003 12.5 3.75003V2.36003C12.8 2.60003 13.15 2.92003 13.64 3.36003L17.6 6.92003C18.09 7.36003 18.47 7.71003 18.77 8.00003H16.75C14.46 8.00003 13.5 7.98003 13.01 7.49003Z" fill="#919191"/>
                </svg>
              </div>
            )}
            <input className='input' type="file" accept="image/*" onChange={handleImagePreview} ref={imgRef} style={{ display: 'none' }} />
          </div>
          <button type='submit'>KIRIM LAPORAN</button>
        </form>
        <div className='footerContainer'>
          <div className='footer'>
          <img className='logo' src="/yayasan.png" alt="logo" />
          <p>“Dan janganlah kamu campuradukkan yang hak dengan yang batil dan (janganlah) kamu sembunyikan yang hak, sedang kamu mengetahui.”</p>
          <b>(QS. Al-Baqarah: 42)</b>
        </div>
        </div>
      </div>

      {/* <div className="success-container" style={isSubmitted ? {display: 'block'} : {display: 'none'}}>
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h1 className="success-title">Laporan Berhasil Dikirim!</h1>
          <p className="success-message">
            Terima kasih atas laporan Anda.
          </p>
          <a href="/" className="success-button">
            Kembali ke Beranda
          </a>
        </div>
      </div> */}

      <div className='successContainer' style={isSubmitted ? {display: 'block'} : {display: 'none'}}>
        <div className='ver-container'>
          <div className='icon-container'>
            <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle className="checkmark-circle" cx="26" cy="26" r="25" />
            <path className="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
          </svg>

          </div>
          <div className='title-container'>
            <div className='thankyouTitle'>
              Laporan Anda Berhasil Dikirim
            </div>
            <div className='sub-title'>
              Terima kasih atas laporan Anda.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
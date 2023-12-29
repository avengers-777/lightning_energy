import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

const QRCodeComponent = ({ text }:{text:string}) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    QRCode.toDataURL(text)
      .then((url: React.SetStateAction<string>) => {
        setSrc(url);
      })
      .catch(err => {
        console.error(err);
      });
  }, [text]);

  return <Image src={src} alt="QR Code" width={300} height={300}/>;
};

export default QRCodeComponent;

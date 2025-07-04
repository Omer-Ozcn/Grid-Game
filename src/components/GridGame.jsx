import React, { useState } from 'react';
import axios from 'axios';

// önerilen başlangıç stateleri
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi gösterir

const initialState = {
  message: initialMessage,
  email: initialEmail,
  steps: initialSteps,
  index: initialIndex,
};

export default function GridGame(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY() {
    // Koordinatları elde etmek için bir state'e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için her kutuya bir index verip, "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y }; 
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını saklamak için bir state'in olması gerekli değildir.
    // Koordinatları, "getXY" helperını kullanarak öğrenebilirsiniz ve ardından "getXYMesaj"ını kullanabilirsiniz.
    // "Koordinatlar (2, 2)" gibi bir stringi döndürür.
    const { x, y } = getXY();
    return `Koordinatlar (${x}, ${y})`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için, şu anki indeksi değiştirmemeli.
    
    const moves = {
      sol: index % 3 === 0 ? index : index - 1,
      sag: index % 3 === 2 ? index : index + 1,
      yukari: index < 3 ? index : index - 3,
      asagi: index > 5 ? index : index + 3,
    };

    const yeniIndex = moves[yon];
    if (yeniIndex === index) {
      const messages = {
        yukari: "Yukarıya gidemezsiniz",
        asagi: "Aşağıya gidemezsiniz",
        sol: "Sola gidemezsiniz",
        sag: "Sağa gidemezsiniz",
      };
      setMessage(messages[yon]);
      return index;
    } else {
      setMessage('');
      setSteps(steps + 1);
      return yeniIndex;
    }
  }


  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    /* https://nextgen-project.onrender.com/api/s9d5/result adresine aşağıdaki formatta bir payload gönderebilir, gelen mesajı ekranda gösterebilirsiniz.
      {
        x: Number,
        y: Number,
        email: String,
        steps: Number,
      }
    */
    evt.preventDefault();
    const { x, y } = getXY();
    const payload = {
      x,
      y,
      steps,
      email,
    };

    axios.post('https://nextgen-project.onrender.com/api/s9d5/result', payload)
    .then((res) => {
      setMessage(res.data.message);
      setEmail('');
    })
    .catch((err) => {
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Hata oluştu.");
      }
    });

  }

  function handleClick(event) {
    const yon = event.target.id;
      if (['sol', 'sag', 'yukari', 'asagi'].includes(yon)) {
        const yeniIndex = sonrakiIndex(yon);
        setIndex(yeniIndex);
      } else if (yon === 'reset') {
        reset();
      }
  }


  const { x, y } = getXY();

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar ({x}, {y})</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="sol" onClick={handleClick}>SOL</button>
        <button id="yukari" onClick={handleClick}>YUKARI</button>
        <button id="sag" onClick={handleClick}>SAĞ</button>
        <button id="asagi" onClick={handleClick}>AŞAĞI</button>
        <button id="reset" onClick={handleClick}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="email girin" value={email} onChange={onChange}/>
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}

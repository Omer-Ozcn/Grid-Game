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

  function getXY() {
    // Koordinatları elde etmek için bir state'e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için her kutuya bir index verip, "B" nin hangi indexte olduğunu bilmek yeterlidir.
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını saklamak için bir state'in olması gerekli değildir.
    // Koordinatları, "getXY" helperını kullanarak öğrenebilirsiniz ve ardından "getXYMesaj"ını kullanabilirsiniz.
    // "Koordinatlar (2, 2)" gibi bir stringi döndürür.
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için, şu anki indeksi değiştirmemeli.
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
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
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar (2, 2)</h3>
        <h3 id="steps">0 kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
            {idx === 4 ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="sol">SOL</button>
        <button id="yukari">YUKARI</button>
        <button id="sag">SAĞ</button>
        <button id="asagi">AŞAĞI</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="email girin"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}

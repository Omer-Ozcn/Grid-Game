import { beforeEach, expect, test } from 'vitest';

import { server } from '../mocks/server';
import React from 'react';
import GridGame from '../components/GridGame';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import fs from 'fs';
import path from 'path';

const gridFile = fs
  .readFileSync(path.resolve(__dirname, '../components/GridGame.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

const waitForOptions = { timeout: 100 };
const queryOptions = { exact: false };

let up, down, left, right, reset, submit;
let squares, coordinates, steps, message, email;

const updateStatelessSelectors = (document) => {
  up = document.querySelector('#yukari');
  down = document.querySelector('#asagi');
  left = document.querySelector('#sol');
  right = document.querySelector('#sag');
  reset = document.querySelector('#reset');
  submit = document.querySelector('#submit');
};

const updateStatefulSelectors = (document) => {
  squares = document.querySelectorAll('.square');
  coordinates = document.querySelector('#coordinates');
  steps = document.querySelector('#steps');
  message = document.querySelector('#message');
  email = document.querySelector('#email');
};

const testSquares = (squares, activeIdx) => {
  squares.forEach((square, idx) => {
    if (idx === activeIdx) {
      expect(square.textContent).toBe('B');
      expect(square.className).toMatch(/active/);
    } else {
      expect(square.textContent).toBeFalsy();
      expect(square.className).not.toMatch(/active/);
    }
  });
};

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});
beforeEach(() => {
  render(<GridGame />);
  updateStatelessSelectors(document);
  updateStatefulSelectors(document);
});
afterEach(() => {
  server.resetHandlers();
  document.body.innerHTML = '';
});

test("[A0] Active Index state'den alınıyor", () => {
  expect(gridFile).not.toContain('idx===4');
});

test('[A1] Aksiyonlar: yok (başlangıç statei <App />) Aktif kare index 4 te olmalı', () => {
  expect(gridFile).not.toContain('idx===4');
  testSquares(squares, 4);
});
test('[A2] Aksiyonlar: yukarı Aktif kare index 1 de olmalı', () => {
  fireEvent.click(up);
  testSquares(squares, 1);
});
test('[A3] Aksiyonlar: yukarı, yukarı Aktif kare index 1 de olmalı', () => {
  fireEvent.click(up);
  fireEvent.click(up);
  testSquares(squares, 1);
});
test('[A4] Aksiyonlar: yukarı, sol Aktif kare index 0 da olmalı', () => {
  fireEvent.click(up);
  fireEvent.click(left);
  testSquares(squares, 0);
});
test('[A5] Aksiyonlar: yukarı, sol, sol Aktif kare index 0 da olmalı', () => {
  fireEvent.click(up);
  fireEvent.click(left);
  fireEvent.click(left);
  testSquares(squares, 0);
});
test('[A6] Aksiyonlar: yukarı, sağ Aktif kare index 2 de olmalı', () => {
  fireEvent.click(up);
  fireEvent.click(right);
  testSquares(squares, 2);
});
test('[A7] Aksiyonlar: yukarı, sağ, sağ Aktif kare index 2 de olmalı', () => {
  fireEvent.click(up);
  fireEvent.click(right);
  fireEvent.click(right);
  testSquares(squares, 2);
});
test('[A8] Aksiyonlar: sağ Aktif kare index 5 de olmalı', () => {
  fireEvent.click(right);
  testSquares(squares, 5);
});
test('[A9] Aksiyonlar: sağ, sağ Aktif kare index 5 de olmalı', () => {
  fireEvent.click(right);
  fireEvent.click(right);
  testSquares(squares, 5);
});
test('[A10] Aksiyonlar: sağ, aşağı Aktif kare index 8 de olmalı', () => {
  fireEvent.click(right);
  fireEvent.click(down);
  testSquares(squares, 8);
});
test('[A11] Aksiyonlar: sağ, aşağı, aşağı Aktif kare index 8 de olmalı', () => {
  fireEvent.click(right);
  fireEvent.click(down);
  fireEvent.click(down);
  testSquares(squares, 8);
});
test('[A12] Aksiyonlar: aşağı, sol Aktif kare index 6 da olmalı', () => {
  fireEvent.click(down);
  fireEvent.click(left);
  testSquares(squares, 6);
});
test('[A13] Aksiyonlar: aşağı, aşağı, sol, sol Aktif kare index 6 de olmalı', () => {
  fireEvent.click(down);
  fireEvent.click(down);
  fireEvent.click(left);
  fireEvent.click(left);
  testSquares(squares, 6);
});

test('[B1] Aksiyonlar: yok (başlangıç durumu <App />) Koordinatlar şurda olmalı (2,2)', () => {
  expect(gridFile).not.toContain('idx===4');
  expect(coordinates.textContent).toMatch(/\(2.*2\)$/);
});
test('[B2] Aksiyonlar: yukarı Koordinatlar şurda olmalı (2,1)', () => {
  fireEvent.click(up);
  expect(coordinates.textContent).toMatch(/\(2.*1\)$/);
});
test('[B3] Aksiyonlar: yukarı, yukarı Koordinatlar şurda olmalı (2,1)', () => {
  fireEvent.click(up);
  fireEvent.click(up);
  expect(coordinates.textContent).toMatch(/\(2.*1\)$/);
});
test('[B4] Aksiyonlar: yukarı, sol Koordinatlar şurda olmalı (1,1)', () => {
  fireEvent.click(up);
  fireEvent.click(left);
  expect(coordinates.textContent).toMatch(/\(1.*1\)$/);
});
test('[B5] Aksiyonlar: yukarı, sol, sol Koordinatlar şurda olmalı (1,1)', () => {
  fireEvent.click(up);
  fireEvent.click(left);
  fireEvent.click(left);
  expect(coordinates.textContent).toMatch(/\(1.*1\)$/);
});
test('[B6] Aksiyonlar: yukarı, sağ Koordinatlar şurda olmalı (3,1)', () => {
  fireEvent.click(up);
  fireEvent.click(right);
  expect(coordinates.textContent).toMatch(/\(3.*1\)$/);
});
test('[B7] Aksiyonlar: yukarı, sağ, sağ Koordinatlar şurda olmalı (3,1)', () => {
  fireEvent.click(up);
  fireEvent.click(right);
  fireEvent.click(right);
  expect(coordinates.textContent).toMatch(/\(3.*1\)$/);
});
test('[B8] Aksiyonlar: sağ Koordinatlar şurda olmalı (3,2)', () => {
  fireEvent.click(right);
  expect(coordinates.textContent).toMatch(/\(3.*2\)$/);
});
test('[B9] Aksiyonlar: sağ, sağ Koordinatlar şurda olmalı (3,2)', () => {
  fireEvent.click(right);
  fireEvent.click(right);
  expect(coordinates.textContent).toMatch(/\(3.*2\)$/);
});
test('[B10] Aksiyonlar: sağ, aşağı Koordinatlar şurda olmalı (3,3)', () => {
  fireEvent.click(right);
  fireEvent.click(down);
  expect(coordinates.textContent).toMatch(/\(3.*3\)$/);
});
test('[B11] Aksiyonlar: right, down, down Koordinatlar şurda olmalı (3,3)', () => {
  fireEvent.click(right);
  fireEvent.click(down);
  fireEvent.click(down);
  expect(coordinates.textContent).toMatch(/\(3.*3\)$/);
});
test('[B12] Aksiyonlar: aşağı, sol Koordinatlar şurda olmalı (1,3)', () => {
  fireEvent.click(down);
  fireEvent.click(left);
  expect(coordinates.textContent).toMatch(/\(1.*3\)$/);
});
test('[B13] Aksiyonlar: aşağı, aşağı, sol, sol Koordinatlar şurda olmalı (1,3)', () => {
  fireEvent.click(down);
  fireEvent.click(down);
  fireEvent.click(left);
  fireEvent.click(left);
  expect(coordinates.textContent).toMatch(/\(1.*3\)$/);
});
test('[C1] Aksiyonlar: yok (başlangıç durumu <App />) Limit aşıldı mesajı boş olmalı', () => {
  expect(gridFile).not.toContain('idx===4');
  expect(message.textContent).toBeFalsy();
});
test('[C2] Aksiyonlar: yukarı Limit aşıldı mesajı boş olmalı', () => {
  expect(gridFile).not.toContain('idx===4');
  fireEvent.click(up);
  expect(message.textContent).toBeFalsy();
});
test('[C3] Aksiyonlar: yukarı, yukarı Limit aşıldı mesajı şöyle olmalı: Yukarıya gidemezsiniz', () => {
  fireEvent.click(up);
  fireEvent.click(up);
  expect(message.textContent).toBe('Yukarıya gidemezsiniz');
});
test('[C4] Aksiyonlar: yukarı, sol Limit aşıldı mesajı boş olmalı', () => {
  expect(gridFile).not.toContain('idx===4');
  fireEvent.click(up);
  fireEvent.click(left);
  expect(message.textContent).toBeFalsy();
});
test('[C5] Aksiyonlar: yukarı, sol, sol Limit aşıldı mesajı şöyle olmalı: Sola gidemezsiniz', () => {
  fireEvent.click(up);
  fireEvent.click(left);
  fireEvent.click(left);
  expect(message.textContent).toBe('Sola gidemezsiniz');
});
test('[C6] Aksiyonlar: yukarı, sağ Limit aşıldı mesajı boş olmalı', () => {
  expect(gridFile).not.toContain('idx===4');
  fireEvent.click(up);
  fireEvent.click(right);
  expect(message.textContent).toBeFalsy();
});
test('[C7] Aksiyonlar: yukarı, sağ, sağ Limit aşıldı mesajı şöyle olmalı: Sağa gidemezsiniz', () => {
  fireEvent.click(up);
  fireEvent.click(right);
  fireEvent.click(right);
  expect(message.textContent).toBe('Sağa gidemezsiniz');
});
test('[C8] Aksiyonlar: sağ Limit aşıldı mesajı boş olmalı', () => {
  expect(gridFile).not.toContain('idx===4');
  fireEvent.click(right);
  expect(message.textContent).toBeFalsy();
});
test('[C9] Aksiyonlar: sağ, sağ Limit aşıldı mesajı şöyle olmalı (3,2)', () => {
  fireEvent.click(right);
  fireEvent.click(right);
  expect(message.textContent).toBe('Sağa gidemezsiniz');
});
test('[C10] Aksiyonlar: sağ, aşağı Limit aşıldı mesajı boş olmalı', () => {
  expect(gridFile).not.toContain('idx===4');
  fireEvent.click(right);
  fireEvent.click(down);
  expect(message.textContent).toBeFalsy();
});
test('[C11] Aksiyonlar: sağ, aşağı, aşağı Limit aşıldı mesajı şöyle olmalı: Aşağıya gidemezsiniz', () => {
  fireEvent.click(right);
  fireEvent.click(down);
  fireEvent.click(down);
  expect(message.textContent).toBe('Aşağıya gidemezsiniz');
});
test('[C12] Aksiyonlar: aşağı, sol Limit aşıldı mesajı boş olmalı', () => {
  expect(gridFile).not.toContain('idx===4');
  fireEvent.click(down);
  fireEvent.click(left);
  expect(message.textContent).toBeFalsy();
});
test('[C13] Aksiyonlar: aşağı, aşağı, sol, sol Limit aşıldı mesajı şöyle olmalı: Sola gidemezsiniz', () => {
  fireEvent.click(down);
  fireEvent.click(down);
  fireEvent.click(left);
  fireEvent.click(left);
  expect(message.textContent).toBe('Sola gidemezsiniz');
});
test('[D1] Adım sayıcı başarılı bir şekilde çalışıyor', () => {
  expect(steps.textContent).toBe('0 kere ilerlediniz');
  fireEvent.click(up);
  fireEvent.click(up);
  fireEvent.click(left);
  expect(steps.textContent).toBe('2 kere ilerlediniz');
  fireEvent.click(right);
  fireEvent.click(right);
  expect(steps.textContent).toBe('4 kere ilerlediniz');
  fireEvent.click(down);
  fireEvent.click(down);
  fireEvent.click(down);
  expect(steps.textContent).toBe('6 kere ilerlediniz');
  fireEvent.click(left);
  fireEvent.click(left);
  fireEvent.click(left);
  expect(steps.textContent).toBe('8 kere ilerlediniz');
});
test('[D2] Adım sayıcı tek seferi de düzgün işledi', () => {
  fireEvent.click(up);
  expect(steps.textContent).toBe('1 kere ilerlediniz');
  fireEvent.click(up);
  expect(steps.textContent).toBe('1 kere ilerlediniz');
});

test('[E1] Reset butonu Aktif kareyi resetledi', () => {
  fireEvent.click(up);
  fireEvent.click(up);
  fireEvent.click(left);
  testSquares(squares, 0);
  fireEvent.click(reset);
  testSquares(squares, 4);
});
test('[E2] Reset butonu ile Koordinatlar resetlendi', () => {
  fireEvent.click(up);
  fireEvent.click(up);
  fireEvent.click(left);
  expect(coordinates.textContent).toMatch(/\(1.*1\)$/);
  fireEvent.click(reset);
  expect(coordinates.textContent).toMatch(/\(2.*2\)$/);
});
test('[E3] Reset butonu ile Mesaj resetlendi', () => {
  fireEvent.click(up);
  fireEvent.click(up);
  expect(message.textContent).toBe('Yukarıya gidemezsiniz');
  fireEvent.click(reset);
  expect(message.textContent).toBeFalsy();
});
test('[E4] Reset butonu ile Adımlar resetlendi', () => {
  fireEvent.click(up);
  fireEvent.click(up);
  fireEvent.click(left);
  expect(steps.textContent).toBe('2 kere ilerlediniz');
  fireEvent.click(reset);
  expect(steps.textContent).toBe('0 kere ilerlediniz');
});
test('[E5] Reset butonu ile Email input resetlendi', () => {
  fireEvent.change(email, { target: { value: 'lady@gaga.com' } });
  expect(email).toHaveValue('lady@gaga.com');
  fireEvent.click(reset);
  expect(email.value).toBeFalsy();
});

test('[F1] Aksiyonlar: yukarı, email gir, submit Başarılı mesajı doğru', async () => {
  fireEvent.click(up);
  fireEvent.change(email, { target: { value: 'lady@gaga.com' } });
  fireEvent.click(submit);
  await screen.findByText('lady win #31', queryOptions, waitForOptions);
});
test('[F2] Aksiyonlar: aşağı, aşağı, email gir, submit Başarılı mesajı doğru', async () => {
  fireEvent.click(down);
  fireEvent.click(down);
  fireEvent.change(email, { target: { value: 'lady@gaga.com' } });
  fireEvent.click(submit);
  await screen.findByText('lady win #43', queryOptions, waitForOptions);
});
test('[F3] Aksiyonlar: yukarı, aşağı, sol, sağ, email gir, submit Başarılı mesajı doğru', async () => {
  fireEvent.click(up);
  fireEvent.click(down);
  fireEvent.click(left);
  fireEvent.click(right);
  fireEvent.change(email, { target: { value: 'lady@gaga.com' } });
  fireEvent.click(submit);
  await screen.findByText('lady win #73', queryOptions, waitForOptions);
});
test('[F4] Aksiyonlar: aşağı, sağ, submit Mail girilmediğinde hata mesajı doğru', async () => {
  fireEvent.click(down);
  fireEvent.click(right);
  fireEvent.click(submit);
  await screen.findByText(
    'Ouch: email is required',
    queryOptions,
    waitForOptions
  );
});
test('[F5] Aksiyonlar: aşağı, sağ, type invalid email, submit geçersiz Mail girildiğinde hata mesajı doğru', async () => {
  fireEvent.click(down);
  fireEvent.click(right);
  fireEvent.change(email, { target: { value: 'bad@email' } });
  fireEvent.click(submit);
  await screen.findByText(
    'Ouch: email must be a valid email',
    queryOptions,
    waitForOptions
  );
});
test('[F6] Aksiyonlar: down, right, type foo@bar.baz email, submit yasaklı email hata mesajı doğru', async () => {
  fireEvent.click(down);
  fireEvent.click(right);
  fireEvent.change(email, { target: { value: 'foo@bar.baz' } });
  fireEvent.click(submit);
  await screen.findByText(
    'foo@bar.baz failure #71',
    queryOptions,
    waitForOptions
  );
});
test('[F7] Aksiyonlar: left, type valid email, submit Gönderildiğinde email inputu resetleniyor', async () => {
  fireEvent.click(left);
  fireEvent.change(email, { target: { value: 'lady@gaga.com' } });
  fireEvent.click(submit);
  await screen.findByText('lady win #29', queryOptions, waitForOptions);
  expect(email.value).toBeFalsy();
});
test('[F8] Aksiyonlar: up, right, type valid email, submit Gönderme adımları ve koordinatları sıfırlamıyor', async () => {
  fireEvent.click(up);
  fireEvent.click(right);
  fireEvent.change(email, { target: { value: 'lady@gaga.com' } });
  fireEvent.click(submit);
  await screen.findByText('lady win #49', queryOptions, waitForOptions);
  expect(coordinates.textContent).toMatch(/\(3.*1\)$/);
  expect(steps.textContent).toBe('2 kere ilerlediniz');
});

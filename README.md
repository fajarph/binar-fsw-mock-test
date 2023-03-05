# binar-fsw-mock-test

1. Apakah Kegunaan JSON pada REST API?

Kegunaan JSON pada REST API adalah untuk mengirim dan menerima data dalam format yang konsisten dan efisien, dan mempermudah interaksi antara server dan client dengan teknologi dan platform yang berbeda.

2. Jelaskan bagaimana REST API bekerja

REST API bekerja dengan menggunakan HTTP protocol untuk mengirim dan menerima data antara server dan client lalu dalam REST API, client mengirimkan permintaan ke server untuk meminta data tertentu dengan sebuah HTTP method GET, POST, PUT atau PATCH dan DELETE sebuah endpoint URI, dan sebuah header. Server merespon dengan sebuah HTTP status code dan data yang diminta oleh client dalam format yang telah disepakati sebelumnya, seperti JSON

Getting Started

# Cara menjalankan backend

1. Buka terminal dan jalankan `cd backend`
2. Lalu jalankan `npm i` untuk menginstall package package yang telah tersedia di backend
3. Create database secara manual di masing-masing database yang anda pakai contoh dari saya, saya menggunakan dbeaver
4. Buat file `.env` yang baru lalu isi berdasarkan contoh `.env.example`
5. Setelah itu `npm start` dan table akan terbuat dengan sendirinya
6. Untuk mencoba menjalankan APInya bisa menggunakan postman dangan base url http://localhost:5000

# Cara menjalankan frontend

1. Buka terminal baru dan jalankan `cd frontend` 
2. Lalu jalankan `npm i` untuk menginstall package package yang telah tersedia di backend
4. Buat file `.env` yang baru lalu isi berdasarkan contoh `.env.example` (isi sesuai dengan port yang anda gunakan)
5. Setelah itu `npm start` lalu buka di browser http://localhost:3000

# Deskripsi fitur
Website tersebut adalah sebuah platform yang memungkinkan pengguna untuk melakukan login dengan menggunakan 4 angka yang telah didaftarkan sebelumnya. Setelah login, pengguna akan diarahkan ke halaman utama yang memiliki fitur my task atau bisa disebut juga dengan to-do list sederhana yang dibuat dengan React Redux. Data to-do list tersebut tersimpan di server dan diakses melalui API. Pengguna dapat menambahkan, dan menyelesaikan task yang telah dikerjakan dengan menekan button veklis item dari to-do list melalui antarmuka pengguna yang disediakan oleh website. Tujuan dari website ini adalah memudahkan pengguna untuk mengelola to-do list mereka secara online dan dapat diakses dari mana saja.


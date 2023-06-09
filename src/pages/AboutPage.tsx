function AboutPage() {
  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-center font-bold text-2xl">
        WELCOME TO MY TO-DO MANAGER📂✔️
      </h1>
      <img
        src="https://inkstickers.com.br/wp-content/uploads/2023/03/7ab90f76a8a1c1abba4f74987b38147d-Editado-1.png"
        className="h-[270px]"
        alt="bender"
      />
      <div className="text-center mt-10">
        <span>In this project I have used React 📘 and Typescript. 🌐</span>
        <p>All data I store in Firebase🔥</p>
        <span>For the state management I have used Redux Toolkit 🔮</span>
      </div>
    </div>
  );
}

export default AboutPage;

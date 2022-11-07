import { GetServerSideProps } from "next";
import Image from "next/image";
import { FormEvent, useState } from "react";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import iconCheckImg from "../assets/icon-check.svg";
import logoImg from "../assets/logo.svg";
import usersAvatarExampleImg from "../assets/users-avatar-example.png";
import { api } from "../lib/axios";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function handleCreatePool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/pools", {
        title: poolTitle
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert("Bolão criado com sucesso! Código copiado para a área de transferência.");

      setPoolTitle("");
    } catch (error) {
      alert("Falha ao criar o bolão tente novamente");
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg.src} width={logoImg.width} height={logoImg.height} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2 ">
          <Image
            src={usersAvatarExampleImg.src}
            width={usersAvatarExampleImg.width}
            height={usersAvatarExampleImg.height}
            alt=""
          />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount} </span>
            pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={handleCreatePool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            value={poolTitle}
            onChange={(event) => setPoolTitle(event.target.value)}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold font-sm uppercase hover:bg-yellow-700 leading-relaxed"
            type="submit"
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className="text-gray-300 mt-4 text-sm">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras
          pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image
              src={iconCheckImg.src}
              width={iconCheckImg.width}
              height={iconCheckImg.height}
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados </span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600" />
          <div className="flex items-center gap-6">
            <Image
              src={iconCheckImg.src}
              width={iconCheckImg.width}
              height={iconCheckImg.height}
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg.src}
        width={appPreviewImg.width}
        height={appPreviewImg.height}
        alt="dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
      />
    </div>
  );
}

/* export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
    api.get("pools/count"),
    api.get("guesses/count"),
    api.get("users/count")
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: usersCountResponse.data.count
    },
    revalidate: 60 * 60 * 1 // 24 hours
  };
};
 */

export const getServerSideProps: GetServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
    api.get("pools/count"),
    api.get("guesses/count"),
    api.get("users/count")
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: usersCountResponse.data.count
    }
  };
};

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import {Login} from "@/components/Login";
import {Cadastro} from "@/components/Cadastro";
import {HomeComponent} from "@/components/Home";
import {Dash} from "@/components/Dashboard";
import {Galeria} from "@/components/Galeria";
import {Menu} from "@/components/Menu";
import {Controle} from "@/components/Controle";


export default function Main() {
  return (
    <div className="flex w-full flex-col min-h-screen overflow-auto">
      <section id="login">
        <Login />
      </section>
    </div>
  );
}


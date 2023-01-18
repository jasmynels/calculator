import "./styles.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { useState } from "react";

const Calculator = () => {
  const [day, setDay] = useState({});

  const formSchema = yup.object().shape({
    installments: yup
      .number("Deve ser um número")
      .required("Número de parcelas obrigatórias")
      .positive()
      .integer(),
    amount: yup.number("Deve ser um número").required("Valor da venda obrigatória").positive(),
    mdr: yup
      .number("Deve ser um número")
      .required("Número de mdr obrigatório")
      .positive()
      .integer()
      .min(1, "O valor minimo de parcelas é 1")
      .max(12, "O valor máximo de parcelas é 12")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data, event) => {
    async function apiSubmit() {
      const formData = data;

      await api
        .post("", formData)
        .then((response) => {
          event.preventDefault();
          setDay({
            1: response.data[1],
            15: response.data[15],
            30: response.data[30],
            90: response.data[90],
          });
          return response;
        })
        .catch((err) => {
          return err;
        });
    }

    apiSubmit();
  };

  function isObjEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  function HaveDay() {
    if (isObjEmpty(day)) {
      return (
        <div className="result">
          <h2>VOCÊ RECEBERÁ:</h2>
          <hr></hr>
          <div className="lista">
            <div className="list">
              <p className="dia">Amanhã: </p>
              <p className="dinheiro">R$ 0,00</p>
            </div>
            <div className="list">
              <p className="dia">Em 15 dias: </p>
              <p className="dinheiro">R$ 0,00</p>
            </div>
            <div className="list">
              <p className="dia">Em 30 dias: </p>
              <p className="dinheiro">R$ 0,00</p>
            </div>
            <div className="list">
              <p className="dia">Em 90 dias: </p>
              <p className="dinheiro">R$ 0,00</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="result">
          <h2>VOCÊ RECEBERÁ:</h2>
          <hr></hr>
          <div className="lista">
            <div className="list">
              <p className="dia">Amanhã: </p>
              <p className="dinheiro">R$ {day[1]} </p>
            </div>
            <div className="list">
              <p className="dia">Em 15 dias: </p>
              <p className="dinheiro">R$ {day[15]}</p>
            </div>
            <div className="list">
              <p className="dia">Em 30 dias: </p>
              <p className="dinheiro">R$ {day[30]}</p>
            </div>
            <div className="list">
              <p className="dia">Em 90 dias: </p>
              <p className="dinheiro">R$ {day[90]}</p>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="corpo">
      <div className="main">
        <div className="form">
          <h1>Simule sua Antecipação</h1>
          <form
            onSubmit={handleSubmit(onSubmitFunction)}
            className="form-principal"
          >
            <label>Informe o valor da venda*</label>
            <input
              {...register("amount")}
              type="text"
              className="form-entrada"
              placeholder="ex: R$ 1.000,00"
            ></input>
            <p className="errors">{errors.amount?.message}</p>
            <label>Em quantas parcelas*</label>
            <input
              {...register("installments")}
              type="text"
              className="form-parcelas"
              placeholder="ex: 12."
            ></input>
            <p className="errors">{errors.installments?.message}</p>
            <label>Informe o percentual de MDR*</label>
            <input
              {...register("mdr")}
              type="text"
              className="form-mdr"
              placeholder="ex: 4"
            ></input>
            <p className="errors">{errors.mdr?.message}</p>
            <input type="submit" id="enviar" value="Enviar"></input>
          </form>
        </div>
        <HaveDay />
      </div>
    </div>
  );
};

export default Calculator;

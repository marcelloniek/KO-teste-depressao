"use client";

import { useState } from 'react';

const perguntas = [
  "뚜렷한 이유 없이 우울하거나 기분이 가라앉는 느낌이 자주 듭니다.",
  "이전에 즐거웠던 활동에 대한 흥미나 즐거움을 잃어버렸다는 걸 자주 느낍니다.",
  "무기력감이나 감정적 공허함으로 인해 아침에 침대에서 일어나거나 평범한 일을 시작하는 것이 어렵습니다.",
  "자주 희망이 없거나 비관적이며 내 인생에 아무런 의미가 없다고 느낍니다.",
  "뚜렷한 이유 없이 식욕이나 수면 패턴이 현저히 달라졌습니다.",
  "최근, 정서적 고통을 끝내기 위해 죽음이나 자살을 생각하거나 사라지고 싶다는 생각이 들었습니다.", // FLAG
  "집중하거나 주의를 유지하기 어려워 자주 멍하거나 정신이 흐트러집니다.",
  "다른 사람들과의 교류가 어렵고 피곤해서 점점 스스로를 고립시키고 있습니다.",
  "뚜렷한 이유 없이 자주 울거나 울고 싶은 충동을 느낍니다.",
  "지속적으로 죄책감이나 무가치함을 느끼며 주변 사람들을 실망시키고 있다는 생각이 듭니다."
];

export default function TesteDepressao() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("적색");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("녹색");
      else if (soma <= 35) setResultado("황색");
      else setResultado("적색");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">우울증 테스트</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">질문 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">결과: {resultado}</h2>
          <img
            src={
              resultado === "녹색"
                ? "/images/semaforo-verde.png"
                : resultado === "황색"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`신호등 표시: ${resultado}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "녹색" && (
            <p className="text-center">이 주제에 매우 잘 대처하고 있으며 정서적으로 안정된 상태입니다. 다른 사람들을 도울 수 있는 능력이 있습니다.</p>
          )}
          {resultado === "황색" && (
            <p className="text-center">해결이 필요한 정서적 어려움의 분명한 신호가 있습니다. 의지와 도움을 통해 극복할 수 있습니다.</p>
          )}
          {resultado === "적색" && (
            <p className="text-center">이 주제와 관련된 정서적 문제가 전문적인 도움이 필요합니다. 가능한 빨리 의사나 심리 전문가를 찾으십시오.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTeste}
          >
            테스트 다시 하기
          </button>
    
        </>
      )}
    </div>
  );
}

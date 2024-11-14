import { useNavigate, useParams } from "react-router-dom";
import { useTurmas } from "../../hooks/Response/TurmaHook/Turmas";
import { useState } from "react";
import { Alunos } from "../../api/InterfaceApi";
import SelectTurma from "../../components/Elements/Turma/SelectTurma";


const Turma = () => {
  const { data, isLoading } = useTurmas();
  const [alunosTurma, setAlunosTurma] = useState<Alunos[] | undefined>([]); 
  const { id } = useParams();
  const navigate = useNavigate();
  
  const buscarTurma = (idTurma: string, alunos: Alunos[]) => {
    navigate(`/admin/${idTurma}`);
    setAlunosTurma(alunos);  
  };

  return (
    <>
      {isLoading && <p>Carregando...</p>}
      {!isLoading && !id && data && (
        <div className="grid grid-cols-2 gap-4">
          {Object.values(data)
            .filter((_, index) => index % 2 === 0)
            .map((item, index) => (
              <div
                key={index}
                className="flex w-auto h-20 bg-slate-300 rounded-lg items-center justify-center duration-300 hover:bg-slate-200 cursor-pointer"
                onClick={() => buscarTurma(item.id, item.alunos)}
              >
                <p>{item.nome}</p>
              </div>
            ))}
          {Object.values(data)
            .filter((_, index) => index % 2 === 1)
            .map((item, index) => (
              <div
                key={index}
                className="flex w-auto h-20 bg-slate-300 rounded-lg items-center justify-center duration-300 hover:bg-slate-200 cursor-pointer"
                onClick={() => buscarTurma(item.id, item.alunos)}
              >
                <p>{item.nome}</p>
              </div>
            ))}
        </div>
      )}

      {id && <SelectTurma alunosTurma={alunosTurma}/>}
    </>
  );
};

export default Turma;

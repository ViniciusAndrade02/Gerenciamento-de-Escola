import { useNavigate, useParams } from "react-router-dom";
import { useTurmas } from "../../hooks/Response/TurmaHook/Turmas";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alunos } from "../../api/InterfaceApi";
import SelectTurma from "../../components/Elements/Turma/SelectTurma";
import CriarTurma from "../../components/Elements/Turma/CriarTurma";
import DeleteTurma from "../../components/Elements/Turma/DeleteTurma";
import UpdateTurma from "../../components/Elements/Turma/UpdateTurma";

const Turma = () => {
  const { data, isLoading } = useTurmas();
  const [alunosTurma, setAlunosTurma] = useState<Alunos[] | undefined>([]);
  const [itemTurma, setItemTurma] = useState<any>();
  const [idTurmaSelect, setIdTurmaSelect] = useState<string>("");
  const [abrirDeleteTurma, setAbrirDeleteTurma] = useState<boolean>(false);
  const [abrirUpdateTurma, setAbrirUpdateTurma] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const buscarTurma = (idTurma: string, alunos: Alunos[]) => {
    navigate(`/admin/${idTurma}`);
    setIdTurmaSelect(idTurma);
    setAlunosTurma(alunos);
  };

  const deleteTurma = (idTurma: string) => {
    setAbrirDeleteTurma(true);
    setIdTurmaSelect(idTurma);
  };

  const updateTurma = (turma: any) => {
    setItemTurma(turma);
    setAbrirUpdateTurma(true);
  };

  return (
    <>
      {!id && <CriarTurma />}
      {isLoading && <p>Carregando...</p>}
      {!isLoading && !id && data && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Object.values(data)
            .filter((_, index) => index % 2 === 0)
            .map((item, index) => (
              <div
                key={index}
                className="flex w-auto h-20 bg-slate-300 rounded-lg items-center justify-center duration-300 hover:bg-slate-200 cursor-pointer relative group "
                onClick={() => buscarTurma(item.id, item.alunos)}
              >
                <p>{item.nome}</p>
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 duration-300">
                  <EditNoteIcon
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateTurma(item);
                    }}
                  />
                  <DeleteIcon
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTurma(item.id);
                    }}
                  />
                </div>
              </div>
            ))}
          {Object.values(data)
            .filter((_, index) => index % 2 === 1)
            .map((item, index) => (
              <div
                key={index}
                className="flex w-auto h-20 bg-slate-300 rounded-lg items-center justify-center duration-300 hover:bg-slate-200 cursor-pointer relative group"
                onClick={() => buscarTurma(item.id, item.alunos)}
              >
                <p>{item.nome}</p>

                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 duration-300">
                  <EditNoteIcon
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateTurma(item);
                    }}
                  />
                  <DeleteIcon
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTurma(item.id);
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      )}

      <DeleteTurma
        abrirDeleteTurma={abrirDeleteTurma}
        setAbrirDeleteTurma={setAbrirDeleteTurma}
        idTurmaSelect={idTurmaSelect}
        setIdTurmaSelect={setAbrirDeleteTurma}
      />

      <UpdateTurma
        itensTurma={itemTurma}
        abrirUpdate={abrirUpdateTurma}
        setAbrirUpdate={setAbrirUpdateTurma}
      />

      {id && <SelectTurma alunosTurma={alunosTurma} idTurma={idTurmaSelect} />}
    </>
  );
};

export default Turma;

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Alunos } from "../../../api/InterfaceApi";
import { useNavigate, useParams } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CriarAluno from "./CriarAluno";
import AlunoDelete from "./AlunoDelete";
import { useState } from "react";
import EditTurma from "./EditTurma";

interface SelectTurma {
  alunosTurma?: Alunos[];
  idTurma: string;
}

const SelectTurma = ({ alunosTurma, idTurma }: SelectTurma) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [abrirDelete, setAbrirDelete] = useState<boolean>(false);
  const [idAlunoDelete, setidAlunoDelete] = useState<string>("");
  const [idAlunoEdit, setIdAlunoEdit] = useState<string>("");

  const deleteAluno = (idAluno: string) => {
    setAbrirDelete(true);
    setidAlunoDelete(idAluno);
  };

  const editAluno = (idAluno: string) => {
    setIdAlunoEdit(idAluno);
  };

  return (
    <>
      {id && (
        <>
          <KeyboardBackspaceIcon
            fontSize="large"
            className="cursor-pointer my-2 "
            onClick={() => navigate("/admin/")}
          />

          <CriarAluno turmaId={idTurma} />
        </>
      )}

      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        {alunosTurma?.length === 0 ? (
          <p className="text-center  ">
            Nenhum Aluno Cadastrado para essa Turma
          </p>
        ) : (
          alunosTurma?.map((item, index) => (
            <>
              <div
                key={index}
                className="mb-4 p-4 border border-gray-300 rounded-md bg-white shadow-sm relative"
              >
                <h1 className="text-xl font-semibold text-gray-800">
                  {item.nome}
                </h1>
                <p className="text-sm text-gray-600">
                  Matrícula: {item.matricula}
                </p>
                <p className="text-sm text-gray-600">
                  Data de Nascimento: {item.dataNascimento}
                </p>

                {idAlunoEdit == item.id && (
                  <EditTurma
                    nome={item.nome}
                    dataNascimento={item.dataNascimento}
                    matricula={item.matricula}
                    idAluno={item.id}
                  />
                )}

                <div className="absolute top-0 right-0 p-2">
                  <EditNoteIcon
                    className="cursor-pointer"
                    onClick={() => editAluno(item.id)}
                  />
                  <DeleteIcon
                    className="cursor-pointer"
                    onClick={() => deleteAluno(item.id)}
                  />
                </div>
              </div>
            </>
          ))
        )}

        <AlunoDelete
          setAbrirDelete={setAbrirDelete}
          abrirDelete={abrirDelete}
          idAlunoDelete={idAlunoDelete}
        />
      </div>
    </>
  );
};

export default SelectTurma;

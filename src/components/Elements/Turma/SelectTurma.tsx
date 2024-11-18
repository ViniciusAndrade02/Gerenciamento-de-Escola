import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Alunos } from "../../../api/InterfaceApi";
import { useNavigate, useParams } from "react-router-dom";
import CriarAluno from "./CriarAluno";

interface SelectTurma {
  alunosTurma?: Alunos[];
  idTurma:string
}

const SelectTurma = ({ alunosTurma,idTurma }: SelectTurma) => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      {id && (
        <>
          <KeyboardBackspaceIcon
            fontSize="large"
            className="cursor-pointer my-2 "
            onClick={() => navigate("/admin/")}
          />

          <CriarAluno turmaId={idTurma}/>
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
                className="mb-4 p-4 border border-gray-300 rounded-md bg-white shadow-sm"
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
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default SelectTurma;

import { useTurmas } from "../../hooks/Response/TurmaHook/Turmas";

const Turma = () => {
  const { data, isLoading } = useTurmas();

  return (
    <>
      {!isLoading && data && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex w-auto h-20 bg-slate-300 rounded-lg items-center justify-center duration-300 hover:bg-slate-200 cursor-pointer">
            {Object.values(data)
              .filter((_, index) => index % 2 === 0)
              .map((item, index) => (
                <p key={index}>{item.nome}</p>
              ))}
          </div>
          <div className="flex w-auto h-20 bg-slate-300 rounded-lg items-center justify-center duration-300 hover:bg-slate-200 cursor-pointer">
            {Object.values(data)
              .filter((_, index) => index % 2 === 1)
              .map((item, index) => (
                <p key={index}>{item.nome}</p>
              ))}
          </div>
        </div>
      )}
      {isLoading && <p>Carregando...</p>}
    </>
  );
};

export default Turma;

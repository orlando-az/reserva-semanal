import { FormEvent, useEffect, useState } from "react";
import { Socio } from "../types/models";
import {
  deleteSocio,
  getSocios,
  postSocio,
  putSocio,
} from "../services/socioService";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SocioList = () => {
  const [socios, setSocios] = useState<Socio[]>([]);
  const [form, setForm] = useState({ nombre: "", email: "" });
  const [editId, setEditId] = useState<number | null>(null);

  const loadData = async () => {
    const res = await getSocios();
    setSocios(res.data);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      var socioEditado = {
        id: editId,
        ...form,
      };
      await putSocio(editId, socioEditado);
      setSocios(socios.map((s) => (s.id === editId ? { ...socioEditado } : s)));
    } else {
      const res = await postSocio(form);
      setSocios([...socios, res.data]);
      setForm({ nombre: "", email: "" });
    }
  };

  const handleEdit = (socio: Socio) => () => {
    console.log("editar");
    setForm({ nombre: socio.nombre, email: socio.email });
    setEditId(socio.id);
  };

  const handleDelete = async (id: number) => {
    await deleteSocio(id);
    setSocios(socios.filter((s) => s.id !== id));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Formulario */}
      <Card>
        <CardHeader>
          <CardTitle>{editId ? "Editar Socio" : "Registrar Socio"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            key={editId ?? "nuevo"}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editId ? "Actualizar" : "Registrar"}
              </Button>
              {editId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditId(null);
                    setForm({ nombre: "", email: "" });
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tabla */}
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableCaption>Listado de socios registrados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {socios.map((socio) => (
              <TableRow key={socio.id}>
                <TableCell>{socio.id}</TableCell>
                <TableCell>{socio.nombre}</TableCell>
                <TableCell>{socio.email}</TableCell>
                <TableCell>
                  {socio.fechaRegistro
                    ? new Date(socio.fechaRegistro).toLocaleDateString()
                    : "Sin fecha"}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" onClick={handleEdit(socio)}>
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(socio.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SocioList;

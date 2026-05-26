import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { api, getApiErrorMessage } from '@/shared/lib/api';
import { PageHeader, DataTable, Button, Input, Card } from '@/shared/components/ui';
import { Modal } from '@/shared/components/Modal';
import type { ReactNode } from 'react';

export interface FieldConfig {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'password' | 'select';
  options?: { value: string | number; label: string }[];
  required?: boolean;
}

export function EntityCrudPage({
  title,
  subtitle,
  endpoint,
  keyField,
  columns,
  fields,
  defaultValues = {},
  canCreate = true,
  canDelete = true,
}: {
  title: string;
  subtitle?: string;
  endpoint: string;
  keyField: string;
  columns: { key: string; label: string; render?: (row: Record<string, unknown>) => ReactNode }[];
  fields: FieldConfig[];
  defaultValues?: Record<string, unknown>;
  canCreate?: boolean;
  canDelete?: boolean;
}) {
  const qc = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: [endpoint],
    queryFn: () => api.get(endpoint).then((r) => r.data.data ?? []),
  });

  const rows = Array.isArray(data) ? data : [];

  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultValues as Record<string, string>,
  });

  const saveMutation = useMutation({
    mutationFn: async (values: Record<string, unknown>) => {
      if (editing) {
        const id = editing[keyField];
        return api.patch(`${endpoint}/${id}`, values);
      }
      return api.post(endpoint, values);
    },
    onSuccess: () => {
      toast.success(editing ? 'Mis à jour' : 'Créé');
      qc.invalidateQueries({ queryKey: [endpoint] });
      setModalOpen(false);
      setEditing(null);
      reset(defaultValues as Record<string, string>);
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => api.delete(`${endpoint}/${id}`),
    onSuccess: () => {
      toast.success('Supprimé');
      qc.invalidateQueries({ queryKey: [endpoint] });
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  const openCreate = () => {
    setEditing(null);
    reset(defaultValues as Record<string, string>);
    setModalOpen(true);
  };

  const openEdit = (row: Record<string, unknown>) => {
    setEditing(row);
    const vals: Record<string, string> = {};
    fields.forEach((f) => {
      vals[f.name] = String(row[f.name] ?? '');
    });
    reset(vals);
    setModalOpen(true);
  };

  const tableColumns = [
    ...columns,
    {
      key: '_actions',
      label: 'Actions',
      render: (row: Record<string, unknown>) => (
        <div className="flex gap-2">
          <button type="button" onClick={() => openEdit(row)} className="text-brand-600 hover:text-brand-800">
            <Pencil size={16} />
          </button>
          {canDelete && (
            <button
              type="button"
              onClick={() => {
                if (confirm('Confirmer la suppression ?')) {
                  deleteMutation.mutate(row[keyField] as string | number);
                }
              }}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        action={
          canCreate ? (
            <Button type="button" onClick={openCreate}>
              <Plus size={18} /> Ajouter
            </Button>
          ) : undefined
        }
      />
      {isLoading ? (
        <p className="text-slate-400">Chargement…</p>
      ) : (
        <DataTable keyField={keyField} data={rows} columns={tableColumns} />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier' : 'Créer'}>
        <form
          onSubmit={handleSubmit((vals) => {
            const payload: Record<string, unknown> = { ...vals };
            fields.forEach((f) => {
              if (f.type === 'number' && vals[f.name] !== '') payload[f.name] = Number(vals[f.name]);
            });
            saveMutation.mutate(payload);
          })}
          className="space-y-4"
        >
          {fields.map((f) => (
            <div key={f.name}>
              <label className="mb-1 block text-sm font-medium text-slate-700">{f.label}</label>
              {f.type === 'select' && f.options ? (
                <select className="input-field" {...register(f.name, { required: f.required })}>
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  type={f.type === 'number' ? 'number' : f.type === 'password' ? 'password' : 'text'}
                  {...register(f.name, { required: f.required })}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Enregistrement…' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export interface BotError {
  message: string;
  statusCode: string | number;
}

export interface BotResponse {
  data: {
    context: vectorContext[];
    output: string;
  } | null;
  error?: BotError;
}

export interface ArticuloMetadata {
  titulo: string;
  articulo: string;
  texto: string;
  capitulo?: string;
}

export interface vectorContext {
  data: string;
  id: string;
  metadata: ArticuloMetadata;
}

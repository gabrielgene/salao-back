import mongoose, { Schema } from 'mongoose';
import BaseDAO from './baseDAO';

export default class Salon extends BaseDAO {
  static _model = mongoose.model(
    'Salon',
    new mongoose.Schema({
      name: String,
      location: String,
      payment: String,
      description: String,
      operationStart: String,
      operationEnd: String,
      breaks: Array,
      services: Array
    })
  );

  static print() {
    console.log('Teste');
  }
}

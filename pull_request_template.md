Descripción del PR:

---------------------------------
- [ ] Revisé que todos los checks están revisados y marcados antes de pedir la revisión del PR

Convención de merge:
<table style="width:100%">
  <tr>
    <th>Branch desde</th>
    <th>Branch hacia</th>
    <th>Merge commit</th>
    <th>Squash and Merge</th>
  </tr>
  <tr>
    <td>feature/</td>
    <td>develop</td>
    <td>&#10060</td>	
    <td>&#9989</td>
  </tr>
  <tr>
    <td>hotfix/</td>
    <td>master - release/</td>
    <td>&#10060</td>
    <td>&#9989</td>
  </tr>
  <tr>
    <td>fix/</td>
    <td>release/</td>
    <td>&#10060</td>
    <td>&#9989</td>
  </tr>
  <tr>
    <td>release/</td>
    <td>master</td>
    <td>&#9989</td>
    <td>&#10060</td>
  </tr>
  <tr>
    <td>backport/</td>
    <td>develop</td>
    <td>&#9989</td>
    <td>&#10060</td>
  </tr>
</table>

¿Qué pasa si hago <b>merge commit</b> cuando debía hacer un <b>squash</b>?
  - Nada grave, simplemente nos estaríamos llevando commits innecesarios al branch donde mergeemos, ejemplo, si en mi branch feature/ tengo 15 commits y los comentarios no son descriptivos (fix, fix tests, working) me estaría llevando todos esos a develop, cuando con el Squash voy a llevar uno solo.
  
¿Qué pasa si hago <b>Squash</b> cuando debía hacer un <b>merge commit</b>?
  - En este caso no estaríamos cumpliendo la función que esperamos que es llevar los commits de un branch a otro para emparejarlos, por ejemplo, cuando mergeamos una release a master, el objetivo es dejar parejos develop y master, y si usamos squash como estrategia de merge van a seguir teniendo commits distintos, por lo que en el siguiente release podríamos tener conflictos.
---------------------------------

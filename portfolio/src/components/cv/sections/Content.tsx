import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

import { CV } from "../../../model/CVModel";

const pdfStyles = StyleSheet.create({
  intro: {
    display: "flex",
    flexDirection: "row",
    fontSize: "10",
    width: "50%",
  },
});

export class Content {
  static render(): JSX.Element {
    return (
      <View style={pdfStyles.intro}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis
          dolor eget facilisis aliquam. Nunc rhoncus purus ac sodales viverra.
          Sed non pellentesque tellus. Donec vitae est vel enim tempus tempor id
          vitae arcu. Quisque feugiat congue mi sit amet auctor. Vestibulum sem
          lorem, pulvinar sed neque facilisis, vestibulum vehicula lacus. Cras
          ac iaculis ipsum. Vestibulum finibus magna ut aliquet gravida. In
          vitae libero lacus. Duis non augue odio. Cras sagittis gravida odio,
          at feugiat dolor auctor non. Phasellus ut hendrerit libero. Mauris
          facilisis massa id semper commodo. Aenean sit amet pellentesque eros.
          Pellentesque nec consequat massa, venenatis placerat lacus. Curabitur
          posuere justo bibendum ligula faucibus varius. Donec est nunc, feugiat
          euismod eros eu, iaculis maximus mi. Mauris a dolor fermentum,
          suscipit odio vel, efficitur lacus. Nunc id ligula bibendum, pharetra
          velit sit amet, dapibus magna. Mauris consequat diam varius, fermentum
          diam et, dapibus nulla. Vestibulum blandit egestas sem, eu molestie
          velit maximus et. Nullam efficitur dolor a mi malesuada, eu finibus
          justo tempus. Morbi ornare ut erat nec posuere. Sed at augue at sem
          tempor fermentum ut ac felis. Suspendisse volutpat sapien vel risus
          ornare, sit amet aliquam nulla dictum. Vivamus at tincidunt felis.
          Fusce commodo nibh arcu, molestie rhoncus leo mattis quis. Etiam mi
          eros, pellentesque at justo ac, fringilla egestas dui. Duis malesuada
          id libero in molestie. Mauris sit amet blandit risus. Nullam venenatis
          nulla eget sagittis suscipit. Nam condimentum odio eget posuere
          luctus. Morbi tincidunt molestie bibendum. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae;
          Vestibulum elementum ligula eget libero rutrum, non rhoncus mauris
          volutpat. Nam placerat erat libero, non imperdiet arcu rutrum
          tincidunt. Ut posuere mauris id mollis semper. Morbi quis nunc in leo
          bibendum dictum et id lorem. In quis pulvinar orci. Ut fringilla
          aliquam faucibus. Cras maximus pretium vulputate. Etiam in eleifend
          sem. Nulla dignissim tempus lacinia. Proin leo velit, porttitor et
          auctor dignissim, sagittis id metus. Aliquam lorem mauris, vestibulum
          eget nisi a, volutpat vehicula leo. Aliquam et suscipit enim, ut
          rhoncus ante. Phasellus justo neque, dignissim at urna vel, sagittis
          imperdiet metus. Sed luctus lectus metus, at faucibus justo pharetra
          et. Curabitur rutrum arcu quis bibendum consectetur. Vestibulum
          interdum purus dignissim felis condimentum, eget consectetur ipsum
          fermentum. Maecenas eros ante, tristique aliquam odio nec, scelerisque
          imperdiet ante. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. In cursus mauris nunc, sit amet
          faucibus sapien tincidunt vel. Vestibulum porttitor massa auctor,
          accumsan libero ac, finibus nisi. Suspendisse quis dolor enim. Nullam
          ornare diam sit amet mauris tincidunt, in luctus nulla finibus. Etiam
          lorem arcu, eleifend a felis vitae, finibus fermentum ligula. Mauris
          porttitor turpis non nisi auctor sollicitudin. Maecenas venenatis sem
          feugiat auctor varius. Morbi sit amet urna viverra nulla gravida
          commodo in finibus lorem. Ut finibus mauris id neque tempus convallis.
          Vivamus consectetur ligula at cursus hendrerit. Nam lorem velit,
          viverra at neque malesuada, sagittis tincidunt metus. Phasellus
          pulvinar in leo consequat pharetra. Nunc molestie, massa eget porta
          eleifend, nibh nisi lobortis ex, a hendrerit ipsum diam at ipsum.
          Donec semper lectus et tellus interdum tempus. Curabitur mattis in
          arcu porta bibendum. Aliquam dignissim risus elit, vel auctor nunc
          pretium sit amet. Mauris varius arcu nisl, sed efficitur risus semper
          vulputate. Aliquam finibus consequat vehicula. Integer tortor enim,
          vulputate nec est id, convallis ornare diam. In facilisis feugiat
          luctus. Curabitur porttitor neque diam, in rhoncus elit porttitor et.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          molestie viverra nunc ut pellentesque. Pellentesque at odio tellus. In
          ut viverra augue, sit amet facilisis lorem. Nam pulvinar quam non
          dolor placerat, id feugiat orci facilisis. Suspendisse dictum, augue
          eget lacinia ornare, lacus arcu luctus ex, sit amet bibendum dui urna
          in nunc. Aenean tincidunt sem a molestie viverra. In hac habitasse
          platea dictumst. Vivamus malesuada risus vitae velit gravida, nec
          porttitor nisl tempus. Aenean et tellus vitae velit mollis dapibus.
          Suspendisse luctus risus et nisl tristique, efficitur blandit ex
          elementum. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Aenean posuere lacus vitae nisi
          tincidunt condimentum. Nunc commodo sem id vulputate placerat. Mauris
          et augue nunc. Donec faucibus lorem vel blandit facilisis. Sed ac
          magna felis. Mauris sit amet cursus purus. Aenean varius dictum
          suscipit. Nunc hendrerit neque eget tellus maximus efficitur. Maecenas
          id sodales ligula. Donec eleifend lectus non pellentesque finibus.
          Curabitur rhoncus lacus id mi faucibus posuere. Vivamus interdum ut
          ante nec volutpat. Nullam ultrices justo at felis fringilla, efficitur
          suscipit quam malesuada. Maecenas justo augue, vestibulum vel
          elementum non, convallis ac massa. Curabitur in risus et felis
          eleifend tempor non sit amet justo. Quisque et sem sed odio laoreet
          fermentum. Aenean in dapibus elit. Morbi fermentum massa enim, a
          fermentum elit pellentesque vitae. Nullam eget metus lectus. Cras
          blandit vehicula urna imperdiet euismod. Ut accumsan ligula id justo
          egestas, eu cursus quam commodo. Aenean sit amet tempor ligula. In
          vitae nunc ac ligula dapibus rutrum et a ante. Morbi ut pretium est.
          Maecenas finibus nisl orci, a elementum turpis sagittis at. Sed
          dignissim mi at dolor euismod pulvinar. Donec lobortis tortor vitae
          laoreet ullamcorper. Nunc at risus vehicula massa congue vulputate in
          sed nibh. Etiam lobortis velit in odio sagittis, eu sagittis nunc
          finibus. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Aliquam efficitur est sed magna
          varius, vitae auctor sapien laoreet. Nullam ut neque malesuada, luctus
          massa mattis, tristique nunc. Nulla purus velit, bibendum at egestas
          nec, finibus in diam. Praesent feugiat finibus eros, a sagittis tellus
          dignissim aliquam. Proin ac semper eros, eu mattis diam. Integer eget
          consectetur lorem, et condimentum tortor. Ut fermentum varius massa,
          et hendrerit erat. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas. Etiam blandit neque in
          imperdiet malesuada. Integer ut dui at justo aliquet imperdiet. In vel
          bibendum mi. In tincidunt, nibh semper scelerisque laoreet, diam elit
          lobortis diam, id maximus orci libero in nisl. Proin ultricies ante
          egestas lorem sodales, quis volutpat dolor euismod. Donec at
          vestibulum orci. Vivamus tempor ullamcorper blandit. Curabitur tellus
          nibh, lobortis ac vestibulum et, sollicitudin vitae magna. Vivamus ac
          lacus sed massa viverra euismod. Praesent vel enim iaculis, egestas
          magna vel, imperdiet mi. Fusce in quam odio. Mauris feugiat faucibus
          faucibus. Ut ex ligula, pellentesque at lorem et, commodo sodales
          nisl. Praesent condimentum metus lacinia enim laoreet, placerat
          faucibus mauris dapibus. Aenean enim eros, elementum ac ipsum id,
          consequat sollicitudin tellus. Suspendisse ut nisl a ligula tristique
          elementum. Nam malesuada congue felis ut scelerisque. Nunc vitae
          iaculis nisl, non vestibulum arcu. Pellentesque non eros ut dui
          tristique fringilla. Donec a leo nulla. Donec libero erat, rutrum eu
          turpis sit amet, auctor finibus nulla. Etiam laoreet enim sed ante
          pharetra volutpat. Nullam sed eleifend libero. Suspendisse nec mi
          convallis, tempus leo efficitur, pulvinar turpis. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Nam vitae dignissim nunc. Maecenas facilisis pretium
          dictum. Sed maximus sed nisi at lobortis. Nam sed porta tortor.
          Phasellus est purus, placerat sit amet lacus at, eleifend malesuada
          urna. Maecenas in diam vel nibh ullamcorper interdum ut vel diam.
          Morbi semper eros vitae rhoncus tristique. Suspendisse sollicitudin,
          lacus sit amet tempus rhoncus, justo ante efficitur mauris, sed
          venenatis neque justo consequat est. Donec molestie purus neque, sed
          laoreet urna dapibus eget. Donec consectetur rhoncus leo, eget
          accumsan dui euismod vel. Donec ut mi non est sollicitudin malesuada.
          Curabitur in nulla mi. Etiam diam dui, tincidunt ut scelerisque
          dapibus, laoreet non ipsum. Sed porta volutpat justo, et placerat
          tortor auctor sed. Phasellus eu lorem purus. Nullam venenatis eu
          libero sed sagittis. Ut varius et quam ut pretium. Nunc sed laoreet
          est. Aliquam ac velit leo. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Phasellus
          hendrerit odio quis erat mollis pulvinar. Vestibulum et dui in magna
          dictum molestie eget id ex. Sed accumsan quam enim, ut semper est
          suscipit a. Suspendisse malesuada dictum lectus, et mattis magna
          blandit nec. Sed convallis ornare urna eu mattis. Etiam metus ipsum,
          ullamcorper sed mi ultricies, vehicula luctus erat. Nulla facilisi.
          Sed malesuada elementum odio, non commodo mi fringilla id. Quisque
          ornare felis ipsum. Praesent id massa vestibulum, venenatis orci ac,
          faucibus metus. Aenean non neque nec leo ullamcorper mattis in vitae
          nibh. Suspendisse malesuada felis vitae interdum aliquam. In sit amet
          semper velit. Phasellus quis leo semper, blandit augue vel, fermentum
          diam. Aliquam dictum, mauris sit amet consequat hendrerit, mauris
          justo fringilla enim, et pulvinar lorem mauris bibendum nisl. Fusce
          nibh augue, fringilla quis varius sed, ornare nec turpis. Ut eu
          laoreet quam, sit amet molestie massa. Curabitur ultricies urna a enim
          efficitur pulvinar. Nulla facilisi. Donec ut orci et lacus finibus
          accumsan in in odio. Phasellus pretium eu felis eu cursus. In lacinia
          nunc sed diam varius, eget interdum mauris gravida. Praesent at lectus
          at diam scelerisque dignissim vitae eu ligula. Vestibulum ut erat in
          elit eleifend tincidunt in id ante. Nunc maximus aliquam diam. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Pellentesque habitant morbi tristique senectus et netus
          et malesuada fames ac turpis egestas. Nullam ut tortor eget eros
          fringilla luctus at id quam. Fusce elementum malesuada nibh sit amet
          consectetur. Vestibulum interdum nisi a sagittis eleifend. In ac
          efficitur est, eget molestie lectus. Quisque vulputate hendrerit
          augue, eget consectetur metus mollis non. Nullam laoreet lacinia diam
          vitae dapibus. Nulla facilisi. Pellentesque tincidunt, diam non
          sodales mattis, ligula enim malesuada ligula, nec mattis nibh dolor
          nec eros. Ut mattis at leo non vulputate. Nunc blandit feugiat lectus,
          sed scelerisque odio vulputate in. Mauris quis ultricies mauris. Cras
          fringilla, neque eu iaculis dignissim, nisl purus pellentesque augue,
          ornare eleifend diam enim cursus eros. Pellentesque pellentesque est
          nec nisl ornare dignissim. Praesent aliquet rhoncus mi vitae luctus.
          Donec nec auctor ante. Nulla et orci tellus. Cras vestibulum justo
          sem, non lobortis tortor condimentum non. Phasellus facilisis, felis
          in vulputate congue, tortor justo laoreet libero, tempus convallis
          lacus mauris sed ipsum. Nam gravida condimentum mollis. Curabitur
          cursus elit non sem suscipit efficitur. Proin sagittis erat sem.
          Nullam consectetur ante libero, quis efficitur purus placerat et.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae; Curabitur vel viverra risus.
          Fusce quis ex bibendum augue tristique mattis ultrices eu nisi. Morbi
          vel metus at nisi egestas rutrum sit amet vitae lorem. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Nulla vitae libero
          lacinia, vehicula augue sit amet, cursus massa. Nunc sagittis sit amet
          purus sed aliquet. Donec tristique rutrum erat in porta. Praesent
          efficitur nisi sit amet ex iaculis, at rhoncus massa tempus. Ut
          finibus viverra tellus, eu varius lectus dictum id. Praesent nec nulla
          eu est facilisis consequat id vehicula turpis. Quisque placerat
          sollicitudin arcu. Vestibulum fermentum odio aliquet, egestas nulla
          nec, egestas quam. Suspendisse et ornare arcu, cursus aliquam purus.
          Morbi fermentum justo in elit dignissim tempus. Nam mollis
          pellentesque lectus in fringilla. Vestibulum ante eros, congue at
          congue vitae, posuere ut justo. Ut blandit quam vitae leo viverra, ut
          condimentum risus finibus. Duis eleifend laoreet neque. Suspendisse
          malesuada augue elit, id egestas purus scelerisque et. Nulla facilisi.
          Maecenas euismod quis dui a cursus. Nullam vitae venenatis risus, non
          tempus libero. Suspendisse ullamcorper aliquet arcu, consequat
          ultrices leo tristique et. Quisque odio dui, ornare sit amet pharetra
          in, rhoncus nec magna. Nam porttitor nec eros in tincidunt. Proin
          tempus ante a viverra condimentum. Nulla id magna id dui fringilla
          cursus. Aenean blandit justo ut metus dapibus tincidunt. Integer
          mollis consequat nunc, vitae molestie magna dictum vel. Etiam sed
          suscipit lorem. Phasellus at ex lacinia, varius ligula a, dignissim
          dui. Quisque et feugiat ipsum. Cras quis lacus justo. Nam bibendum
          diam id mi pretium, nec rutrum magna commodo. Etiam ut sapien non
          metus tristique aliquet. Sed aliquet in metus non auctor. Donec id
          purus aliquam, placerat dolor quis, iaculis ex. Nulla vitae lacus in
          urna porta suscipit. Maecenas consequat vulputate felis, vel pharetra
          augue commodo at. Aliquam dapibus, nisl ut volutpat pulvinar, urna
          felis commodo turpis, blandit tincidunt quam enim a ipsum. Sed mattis
          tortor neque, a faucibus sem facilisis eu. Etiam quis turpis pulvinar,
          dictum libero sit amet, dictum mi. Vivamus facilisis lacus in
          pellentesque pharetra. Curabitur eros enim, euismod vitae sem mattis,
          tincidunt interdum lacus. Suspendisse faucibus semper porttitor.
          Suspendisse potenti. Mauris ultricies leo sit amet leo posuere tempus.
          Suspendisse scelerisque et ipsum eu rutrum. Fusce tincidunt, ipsum
          vitae vestibulum ultricies, lectus erat posuere lectus, at consequat
          velit enim eget lorem. Fusce iaculis erat sit amet lorem laoreet
          venenatis. Duis sed placerat ipsum, id tincidunt turpis. Proin orci
          erat, ullamcorper vel ex at, tristique egestas augue. Vestibulum
          ullamcorper interdum ipsum. Nam sed mauris sit amet turpis cursus
          tempus. Etiam a rutrum elit, a ullamcorper erat. Cras et purus et
          dolor volutpat dictum. Etiam sit amet porttitor est. Donec ut nulla
          luctus, rutrum urna sed, ultricies mauris. Curabitur in metus id
          ligula vehicula semper. Sed eleifend eros eu bibendum molestie.
          Vivamus gravida orci vel ante dictum blandit. Proin vel tristique
          sapien. Duis imperdiet, dolor vel aliquet suscipit, ligula neque
          suscipit urna, nec blandit risus odio sed tortor. Mauris tincidunt
          malesuada purus quis vestibulum.
        </Text>
      </View>
    );
  }
}
